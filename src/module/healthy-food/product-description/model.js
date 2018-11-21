const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductDescriptionSchema = Schema({
    product: {type: Schema.Types.ObjectId, ref: "Product"},
    weight: Number,
}, { toJSON: { virtuals: true } });

const ProductDescription = mongoose.model('ProductDescription', ProductDescriptionSchema);

module.exports = ProductDescription;