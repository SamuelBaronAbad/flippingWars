const express = require("express");

const app = express();
const { API_VERSION } = require("./config");

// Load Routings
const authRoutes = require("./routers/auth");
const cardsRoutes = require("./routers/cards");
const userRoutes = require("./routers/user");

app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Configure Headers HTTP

// Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, cardsRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;