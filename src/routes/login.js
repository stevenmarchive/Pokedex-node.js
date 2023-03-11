const { User } = require('../base de donnée/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privatekey = require ('../auth/private_key')
  
module.exports = (app) => {
app.post('/api/login', (req, res) => {
  
User.findOne({ where: { username: req.body.username } }).then(user => { //Compare le mot de passer donnée de l'utilisateur avec la base de données
    if(!user){ //Affiche un message d'erreur si l'utilisateur est incorrect
        const message = `L'utilisateur est incorrect`
        return res.status(404).json({message})
    }
    bcrypt.compare(req.body.password, user.password).then(isPasswordValid => {
        if(!isPasswordValid) { //Affiche un message d'erreur si le mot de passe est incorrect
          const message = 'Le mot de passe est incorrect';
          return res.status(401).json({ message, data: user })
        }

        //JWT
        const token = jwt.sign( // Génère un jeton Jwt pour avoir un identifiant unique correct
          {userId: user.id},
          privatekey,
          {expiresIn :'24h'}
        )


        const message = `L'utilisateur a été connecté avec succès`;
        return res.json({message,data:user,token})
      })
})
.catch(error=>{
    const message = `L'utilisateur n'a pas pu être connecté. Réessayez dans quelques instants`;
    return res.json({message, data:error})
})
})
}