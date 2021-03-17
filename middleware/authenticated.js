// Esto lo usamos para que un user no logueado no pueda entrar en ciertas paginas, en este caso lo usamos para que no acceda al findAll Users
// Si viene sin cabecera no me deja entrar, y si el token no es valido o expirado tampoco deja entrar

const jwt = require('jwt-simple');
const moment = require('moment');

const SECRET_KEY = "Smg4f5.7u/huhd.jAmxQwe";

exports.ensureAuth = (req, res, next) =>{
 if(!req.headers.authorization) {
     res.status(403).send({message: "La petición no tiene cabecera de Autenticación."})
 }

 const token = req.headers.authorization.replace(/['"]+/g, "");

 try {
     var payload = jwt.decode(token, SECRET_KEY);
     if (payload.exp <= moment().unix()){
         return res.status(404).send({message: "El token ha expirado"});
     } 
     
 } catch (error) {
   //console.log(error);  
   return res.status(404).send({message: "Token inválido"})
 }

 req.user = payload;
 next();
}
