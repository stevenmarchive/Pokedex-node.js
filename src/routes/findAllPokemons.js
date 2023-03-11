const { Pokemon } = require('../base de donnée/sequelize')
const { Op } = require('sequelize')
const auth = require ('../auth/auth')
  
module.exports = (app) => {
app.get('/api/pokemons',auth, (req, res) => {
  if (req.query.name){ // Si l'utilisateur cherche un pokémon spécifique
    const name = req.query.name // Permets d'indiquer qu'on souhaite extraire le paramètre name de l'URL
    const limit = parseInt(req.query.limit) || 5 // parseInt car on convertit le paramètre de chaine de caractère en nombre entier

    if (name.length < 2){ // La recherche doit contenir 2 caractères minimums
      const message = 'Le terme de recherche doit contenir au moins 2 caractères '
      return res.status(400).json({message})
    }

    return Pokemon.findAndCountAll( // Va chercher le nombre total du résultat et le résultat demandé
      {where:{
        name:{ // Propriété du modèle pokémon
          [Op.like]:`%${name}%`} // name = critère de la racherche % = On recherche tous les pokémon qui ont les termes inclus du name
        },
        order: ['name'], // Définis le tri du résultat par ordre croissant, si on le veut en décroisant = ['name','DESC']
        limit:limit // Limite la recherche en fonction de la const limit défini par défaut à 5
      }) 
    .then(({count,rows})=>{ // Retourne les informations du findAndCountAll
      const message = `Il y a ${count} pokémons qui correspondent au terme ${name}`
      res.json({message,data: rows})
    })
  } 
  else{ // Si l'utilisateur souhaite afficher tous les pokémon de la base de données
    Pokemon.findAll({order:['name']}) // Tri le résultat par rapport à order:['name'] (ligne 18)
    .then(pokemons => {
      const message = 'La liste des pokémons a bien été récupérée.'
      res.json({ message, data: pokemons })
    })
    .catch(error =>{
      const message =`La liste des pokémons n'a pas pu être récupérée. Réessayer`
      res.status(500).json({message,data:error})
    })
  }
})
}