const { Pokemon } = require('../base de donnée/sequelize')
const auth = require('../auth/auth')
  
module.exports = (app) => {
app.delete('/api/pokemons/:id',auth, (req, res) => {
Pokemon.findByPk(req.params.id).then(pokemon => {
  if(pokemon===null){
    const message =`Le pokémon demandé n'existe pas.`;
    return res.status(404).json({message})
  }
  const pokemonDeleted = pokemon;
  return Pokemon.destroy({ // return permet de traiter tous les erreurs 500 en 1 seul catch
    where: { id: pokemon.id }
  })
  .then(_ => {
    const message = `Le pokémon avec l'identifiant n°${pokemonDeleted.id} a bien été supprimé.`
    res.json({message, data: pokemonDeleted })
  })
  .catch(error =>{
    const message = `Le pokémon n'a pas pu être modifié.`
    res.status(500).json({message,data:error})
  })
})
})
}