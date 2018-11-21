const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HealthyFoodSchema = Schema({
    days: [{type: Schema.Types.ObjectId, ref: "Day"}],
}, { toJSON: { virtuals: true } });

const HealthyFood = mongoose.model('HealthyFood', HealthyFoodSchema);

module.exports = HealthyFood;