const { Pokemon } = require('../base de donnée/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
  app.get('/api/pokemons/:id',auth, (req, res) => {
    Pokemon.findByPk(req.params.id) //findByPk adapte un float en chaine de caractère si besoin et remplace parceInt
      .then(pokemon => {
        if(pokemon===null){
          const message =`Le pokémon demandé n'existe pas.`;
          return res.status(404).json({message})
        }
        const message = 'Un pokémon a bien été trouvé.'
        res.json({ message, data: pokemon })
      })
      .catch(error =>{
        const message = `Le pokémon n'a pas pu être récupérée.`
        res.status(500).json({message,data:error})
      })
  })
}