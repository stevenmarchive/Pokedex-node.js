const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const pokemons = require('./mock-pokemon')
const UserModel= require('../models/user')
const bcrypt = require('bcrypt')

const sequelize = new Sequelize(
'pyyf103uek26gn95', //Database
'fuc8v1sf5iizw9w9', //Username
'qe18u53fkh57nzmp', //Password
{host: 'eporqep6b4b8ql12.chr7pe7iynqr.eu-west-1.rds.amazonaws.com',dialect: 'mariadb',logging: false})

sequelize.authenticate()
.then(_=>console.log('La connexion est bien établie.'))
.catch(error=>console.error('Pas de connexion'))

const Pokemon = PokemonModel(sequelize,DataTypes) //Création de la table Pokémon depuis le modele datatypes et sequelize
const User = UserModel(sequelize,DataTypes)
  
const initDb = () => {

return sequelize.sync().then(_ => {
  pokemons.map(pokemon => {
    Pokemon.create({name: pokemon.name,hp: pokemon.hp,cp: pokemon.cp,picture: pokemon.picture,types: pokemon.types})
    .then(pokemon => console.log(pokemon.toJSON()))
    })

  bcrypt.hash('pikachu',10) //Crypte le mot de passe , 10=> temps de cryptage du mot de passe
  .then(hash=>User.create({username:'pikachu',password:hash})) //Créer une nouvelle colonne utilisateur
  .then(user=>console.log(user.toJSON()))
  console.log('La base de donnée a bien été initialisée !')
})

}
  
module.exports = { 
  initDb, Pokemon, User //Permets d'exporter le module dans les autres fichiers
}