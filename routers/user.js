const express = require("express");
const userController = require("../controllers/user");
const multipart = require("connect-multiparty");

const md_auth = require('../middleware/authenticated');
const md_uploadAvatar = multipart({ uploadDir: "./uploads/avatar"})

const api = express.Router();

// SignUp User
api.post("/user/sign-up", userController.signUp)
// SignIn User
api.post("/user/sign-in", userController.signIn)
// FindOne User
api.get("/user/find/:email", [md_auth.ensureAuth], userController.findUser)
// FindAll Users
api.get("/user/find-all", [md_auth.ensureAuth], userController.findAll)
// Users Active
api.get("/user/find-users-active", [md_auth.ensureAuth], userController.usersActive)
// Upload Avatar
api.put("/user/upload-avatar/:id", [md_auth.ensureAuth, md_uploadAvatar],userController.uploadAvatar)
// Find Avatar: solo devuelve imagenes, asique no lo protegemos con los md_
api.get("/user/find-avatar/:avatarName", userController.findAvatar)
// Update Users
api.put("/user/update-user/:id", [md_auth.ensureAuth],userController.updateUser)

module.exports = api;