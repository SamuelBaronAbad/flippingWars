const User = require("../models/user");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../services/jwt");
const fs = require("fs");
const path = require("path");

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
                            res.status(500).send({ message: "El email ya existe" })
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
                    if (!userStored.active) {
                        res.status(200).send({ code: 200, message: "El usuario no está activo" })
                    } else {
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

function findUser(req, res) {
    const email = req.params.email;
    User.findOne({ email })
        .then(user => {
            if (!user) {
                res.status(404).send({ message: "No se ha encontrado al usuario" });
            } else {
                res.status(200).send({ name: user.name, email: user.email })
            }
        })
}

function findAll(req, res) {
    User.find({})
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Ha ocurrido un error muy grave, los usuarios no se encuentran" });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error del servidor" });
        })
}

function usersActive(req, res) {
    // Query recibira todo lo que le ponga en la url: /find-users-active?active=true&name=Samuel...
    const query = req.query;
    User.find({ active: query.active })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Ha ocurrido un error muy grave, los usuarios no se encuentran" });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error del servidor" });
        })
}

function uploadAvatar(req, res) {
    const params = req.params;

    User.findById({ _id: params.id }, (err, userData) => {
        if (err) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if (!userData) {
                res.status(404).send({ message: "No se ha encontrado ningún usuario" })
            } else {
                let user = userData;
                if (req.files) {
                    let filePath = req.files.avatar.path
                    let fileSplit = filePath.split("\\");
                    let fileName = fileSplit[2];
                    let fileExtension = fileName.split(".")[1]

                    if (fileExtension !== "png" && fileExtension !== "jpg") {
                        res.status(200).send({ message: "Extensión de imagen no válida (Solo permitida .png o .jpg)" })
                    } else {
                        user.avatar = fileName;
                        User.findByIdAndUpdate({ _id: params.id }, user, (err, userResult) => {
                            if (err) {
                                res.status(500).send({ message: "Error del servidor" })
                            } else {
                                if (!userResult) {
                                    res.status(404).send({ message: "No se ha encontrado ningún usuario" })
                                } else {
                                    res.status(200).send({ avatarName: fileName })
                                }
                            }
                        })
                    }
                    // path.dirname(pathFile)
                }

            }
        }
    })

}

function findAvatar(req, res) {
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/avatar/" + avatarName;
   
    fs.exists(filePath, exists => {
        if (!exists){
            console.log(exists);
            res.status(404).send({ message: "El avatar que buscas no existe" })
        }else {
            res.sendFile(path.resolve(filePath));
        }
    })
}

function updateUser (req, res){
    const userData = req.body;
    const params = req.params;

    User.findByIdAndUpdate({_id: params.id}, userData, (err, userUpdate) => {
        if (err){
            console.log(err);
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if (!userUpdate){
                res.status(404).send({ message: "No se ha encontrado ningún usuario" })
            } else {
                res.status(200).send({ message: "Usuario actualizado correctamente"})
            }
        }
    })
}

module.exports = {
    signIn,
    signUp,
    findUser,
    findAll,
    usersActive,
    uploadAvatar,
    findAvatar,
    updateUser
}