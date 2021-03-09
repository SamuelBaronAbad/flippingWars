const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newRecordSchema = Schema ({
    id: Number,
    users: [],
    cards: [],
    status: {
        type: Boolean,
        default: true
    }
},{
    collection: "records",
    timestamps: {
        createdAt: "created",
        updateAt: "update"
    }
})

module.exports = mongoose.model("newGame", newRecordSchema)