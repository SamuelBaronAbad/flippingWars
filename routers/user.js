const express = require("express");
const userController = require("../controllers/user");

const api = express.Router();

// FindOne user

// SignUp User
api.post("/user/sign-up", userController.signUp)

// SignIn User
api.post("/user/sign-in", userController.signIn)

// FindOne User
api.get("/user/find/:email", userController.findUser)

module.exports = api;