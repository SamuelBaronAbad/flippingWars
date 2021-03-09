const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cardSchema = Schema({
    _id: false,
    num: Number,
    values: Array,
    status: Boolean
})


module.exports = mongoose.model("Card", cardSchema);