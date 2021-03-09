const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    role: String,
    active: Boolean
},{
    collection: "users",
    timestamps: {
        createdAt: "created",
        updateAt: "update"
    }
})

module.exports = mongoose.model("user", userSchema); 