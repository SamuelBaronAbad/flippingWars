const express = require("express");
const cardsController = require("../controllers/cards");

const api = express.Router();

// FindOne
api.get("/:id", cardsController.cardFind);

// FindAll
api.get("/", cardsController.cardFindAll)

// Update
api.put("/", cardsController.cardUpdate);

// New Game
api.post("/", cardsController.newRecordGame)




module.exports = api;