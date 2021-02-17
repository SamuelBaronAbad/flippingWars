const { findOneAndUpdate } = require("../models/cards");
const Card = require("../models/cards");

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
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error del servidor" });
        })
};

// actualiza una carta 
function cardUpdate(req, res) {
    const id = req.params.id;

    Card.findOneAndUpdate({ id }, req.body, { new: true })
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Carta no encontrada" })
            } else {
                res.send({ message: "Carta Actualizada" })
                console.log("carta actualizada: ", data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Ha ocurrido un error al actualizar" })
        })
}

module.exports = {
    cardFind,
    cardUpdate,
    cardFindAll
};