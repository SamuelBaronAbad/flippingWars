const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = Schema({
    id: Number,
    values: Array,
    status: Boolean
})


module.exports = mongoose.model("Card", cardSchema);