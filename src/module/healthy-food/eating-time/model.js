const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EatingTimeSchema = Schema({
    name: String,
    productsDescription: [{type: Schema.Types.ObjectId, ref: "ProductDescription"}]
}, { toJSON: { virtuals: true } });

const EatingTime = mongoose.model('EatingTime', EatingTimeSchema);

module.exports = EatingTime;