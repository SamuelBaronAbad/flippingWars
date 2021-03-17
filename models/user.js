const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const userSchema = Schema({
    username: {
        type: String,
    },
    name: String,
    lastname: String,
    birthDate: Date,
    email: {
        type: String,
        unique: true
    },
    password: String,
    avatar: String,
    role: String,
    active: Boolean
},{
    collection: "users",
    timestamps: { 
    }
})

module.exports = mongoose.model("user", userSchema); 