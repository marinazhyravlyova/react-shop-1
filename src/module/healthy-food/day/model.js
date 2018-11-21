const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DaySchema = Schema({
    date: Date,
    eatingTimes: [{type: Schema.Types.ObjectId, ref: "EatingTime"}]
}, { toJSON: { virtuals: true } });

const Day = mongoose.model('Day', DaySchema);

module.exports = Day;