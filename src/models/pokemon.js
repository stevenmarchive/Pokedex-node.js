const validTypes=['Plante','Poison','Feu','Eau','Insecte','Vol','Normal','Electrik','Fée']

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false, //Ne peux pas être null
        unique:{
          msg:'Le nom est déjà pris'
        },
        validate:{
          notEmpty:{msg: 'Le nom ne peut pas être vide'},
          notNull:{msg:'Le nom est demandé'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg: 'Utilisez uniquement des nombres entiers.'},
          min:{
            args:[0],
            msg:'Les points de vie doivent être supérieurs à 0'
          },
          max:{
            args:[999],
            msg: 'Les points de vie doivent être inférieurs à 999'
          },
          notNull:{msg: 'Les points de vie sont demandés'}
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
          isInt:{msg:'Utilisez uniquement des nombres entiers'},
          min:{
            args:[0],
            msg:'Les points de dégâts doivent être supérieurs à 0'
          },
          max:{
            args:[99],
            msg: 'Les points de dégâts doivent être inférieurs à 99'
          },
          notNull:{msg:'Les points de dégâts sont demandés'}
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        isUrl:{msg:'Utilisez uniquement une RUL valide'},
        notNull:{msg:`L'image est demandé`}
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')
        },
        set(types){
          this.setDataValue('types',types.join())
        },
        validate:{
          isTypesValid(value){ //Prends la valeur types de la base de données
            if(!value){ //sequelize teste s'il y a une erreur dans les types insérer et s'il trouve une erreur envoie le message
              throw new Error('Un pokémon doit au moins avoir un type')
            }
            if(value.split(',').length>3){ //sequelize teste s'il y a une erreur dans les types insérer et s'il trouve une erreur envoie le message
              throw new Error('Un pokémon ne peux pas avoir plus de trois types.')
            }
            value.split(',').forEach(type=>{ //Vérifie si la valeur correspond à un élément du tableau défini dans la variable validTypes
              if(!validTypes.includes(type)){ //Si aucune valeur ne correspond au tableau
                throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`)
              }
            });
          }
        }
      }
    }, {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false
    })
  }