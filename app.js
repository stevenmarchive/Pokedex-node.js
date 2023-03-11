const express = require('express')
const bodyParser = require('body-parser')
const sequelize = require('./src/base de donnée/sequelize')

const app = express() //Il s'agit du serveur web
const port = 3306; // Il s'agit du port du serveur web
app.listen(port,()=>console.log(`Note application : http://localhost:${port}`)) `On démarre l'application sur le port 3000`


sequelize.initDb()

app.get('/', (req, res) => res.send('Hello, Express!'))

require ('./src/routes/findAllPokemons')(app) //On met en place une nouvelle route en appelant le point de terminaison app
require('./src/routes/findPokemonByPk')(app)
require('./src/routes/createPokemon')(app)
require('./src/routes/updatePokemon')(app)
require('./src/routes/deletePokemon')(app)
require('./src/routes/login')(app)

//Gestion des erreurs 

app.use(({res})=>{
  const message = 'Impossible de trouver la ressource demandée'
  res.status(404).json({message})
})