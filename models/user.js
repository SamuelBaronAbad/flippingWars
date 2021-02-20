const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    name: {
        type: String,
        unique: true,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    }
})

module.exports = mongoose.model("user", UserSchema); 