const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");

function signUp(req, res) {
    console.log(req.body);
    const user = new User();
    const { username, email, password, rePassword } = req.body;
    user.username = username;
    user.email = email;
    user.role = "user";
    user.active = false;

    if (!password || !rePassword) {
        res.status(404).send({ message: "Contraseñas obligatorias" })
    } else {
        if (password !== rePassword) {
            res.status(404).send({ message: "Las contraseñas deben ser iguales" })
        } else {
            bcrypt.hash(password, null, null, function (err, hash) {
                if (err) {
                    res.status(500).send({ message: "Error al encriptar el password" })
                } else {
                    user.password = hash;
                    console.log(user.password);
                    user.save((err, userStored) => {
                        if (err) {
                            res.status(500).send({ message: "Error al crear el usuario" })
                        } else {
                            if (!userStored) {
                                res.status(404).send({ message: "Error al crear usuario" })
                            } else {
                                res.status(200).send({ user: userStored })
                            }
                        }
                    })
                }
            })
        }
    }


}

function signIn(req, res) {
    console.log(req.body);
    const params = req.body;
    const email = params.email.toLowerCase();
    const password = params.password;

    User.findOne({ email }, () => {
    }).then(userStored => {
        if (!userStored) {
            res.status(404).send({ message: "El email no está registrado" });
        } else {
            bcrypt.compare(password, userStored.password, (err, check) => {
                if (err) {
                    res.status(500).send({ message: "Error del servidor" });
                } else if (!check) {
                    res.status(404).send({ message: "Contraseña erronea" });
                } else {
                    if (!userStored.active){
                        res.status(200).send({code: 200, message: "El usuario no está activo"})
                    }else {
                    res.status(200).send({
                        accessToken: jwt.createAccessToken(userStored),
                        refreshToken: jwt.createRefreshToken(userStored)
                    })
                }
                }
            }
            )
        }
    }).catch(err => {
        res.status(500).send({ message: err.message || "Ha ocurrido un error al iniciar sesion" })
    })
}

function findUser (req, res){
    const email = req.params.email;
    User.findOne({email})
    .then (user => {
        if(!user){
            res.status(404).send({ message: "No se ha encontrado al usuario" });
        }else {
            res.status(200).send({name: user.name, email: user.email})
        }
    })
}

module.exports = {
    signIn,
    signUp,
    findUser
}