const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const { API_VERSION } = require("./config");

// Load Routings
const cardsRoutes = require("./routers/cards");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Configure Headers HTTP

// Router Basic
app.use(`/api/${API_VERSION}`, cardsRoutes);

module.exports = app;