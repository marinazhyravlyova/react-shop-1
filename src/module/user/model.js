const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    email: {type: String, default: "untitled user email"},
    name: {type: String, default: "untitled user"},
    password: {type: String, default: "untitled user"},
    token: {type: String },
    basket: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    healthyFood: {
        type: Schema.Types.ObjectId,
        ref: "HealthyFood",
        default: null,
    }
}, { toJSON: { virtuals: true } });

const User = mongoose.model('User', UserSchema);

module.exports = User;