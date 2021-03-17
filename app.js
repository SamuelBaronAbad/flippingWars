const express = require("express");

const app = express();
const { API_VERSION } = require("./config");

// Load Routings
const authRoutes = require("./routers/auth");
const cardsRoutes = require("./routers/cards");
const userRoutes = require("./routers/user");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Configure Headers HTTP
// Con esto pondremos los Cors
app.use((req, res, next) => {
    // Para controlar quien puede consumir mi API
    res.header("Access-Control-Allow-Origin", "*");
    //  Para configurar los headers que acepta la API
    res.header("Access-Control-Allow-Headers",
        "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Methods");
    // Para declarar los métodos que acepta el API
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
})

// Router Basic
app.use(`/api/${API_VERSION}`, authRoutes);
app.use(`/api/${API_VERSION}`, cardsRoutes);
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;