const mongoose = require('mongoose')
const tableSchema = require('./Table').schema

let daySchema = new mongoose.Schema({
    date: Date,
    table: [tableSchema]
})

let Day = mongoose.model('Day', daySchema)

module.exports.model = Day;
module.exports.schema = daySchema;