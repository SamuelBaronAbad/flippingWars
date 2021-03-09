const Card = require("../models/cards");
const NewGame = require("../models/newGame");


// encuentra todas las cartas para iniciar la partida
function cardFindAll(req, res) {
    Card.find({})
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Ha ocurrido un error muy grave, no se encuentra ninguna carta" });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error del servidor" });
        })
}

// encuentra una carta para obtener info de ella u otra cosa
function cardFind(req, res) {
    // req.body o params contendrá los atributos del json console.log(params);
    const id = req.params.id;
    Card.find({ id }, () => {
        if (id < 1 || id > 24) {
            res.status(404).send({ message: "La carta no existe" });
        }
    })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Carta no encontrada" });
            } else {
                res.status(200).send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error del servidor" });
        })
};

// actualiza una carta 
function cardUpdate(req, res) {
    const id = req.body.id;
    NewGame.findOneAndUpdate({ id }, req.body, {new: true})
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Carta no encontrada" })
            } else {
                res.send({ message: "Partida Actualizada" })
                console.log("Partida actualizada: ", data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Ha ocurrido un error al actualizar" })
        })
}


function newRecordGame (req, res){
    const newGame = new NewGame();
    const {users, cards, id} = req.body;
    newGame.id = id;
    newGame.users = users;
    newGame.cards = cards;
 
    newGame.save((err, newGameStored) => {
        if(err){
            res.status(500).send({ message: err.message || "Error al crear nuevo registro de partida" });
        }else {
            res.status(200).send({newGame: newGameStored});
        }
    });
}

// Devuelve el campo 'id' => ({}, 'id') del ultimo registro (ordena => sort({los id=> id: en orden desc => -1}) y devuelve solo 1 => limit(1)
function idGame (req, res) {

    NewGame.find({}, 'id').sort({id:-1}).limit(1)
    .then(data => {
        if(!data) {
            res.status(404).send({message: "La partida no existe"})
        }else{
            res.status(200).send(data)
        }
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Ha ocurrido un error al encontrar la partida"})
    })
}

module.exports = {
    cardFind,
    cardUpdate,
    cardFindAll,
    newRecordGame,
    idGame
};