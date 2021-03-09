const express = require("express");
const cardsController = require("../controllers/cards");

const api = express.Router();

// FindOne Card
api.get("/:id", cardsController.cardFind);

// FindAll Cards
api.get("/", cardsController.cardFindAll)

// FindId Game
api.get("/partida/partida", cardsController.idGame);

// Update
api.put("/partida/partida", cardsController.cardUpdate);

// New Game
api.post("/", cardsController.newRecordGame)




module.exports = api;