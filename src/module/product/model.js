const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name: {type: String, default: "untitled product"},
    description: {type: String, default: "without description"},
    url: {type: String, default: ""},
    price: {type: Number, default: 1},
    comments: [{type: Schema.Types.ObjectId, ref: "Comment"}]
}, { toJSON: { virtuals: true } });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;