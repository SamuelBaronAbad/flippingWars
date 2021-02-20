const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Users = require("./user");
const Cards = require("./cards");


const newRecordSchema = Schema ({
    id: Number,
    users: [],
    cards: []
},{
    collection: "records",
    timestamps: {
        createdAt: "created",
        updateAt: "update"
    }
})

module.exports = mongoose.model("newGame", newRecordSchema)