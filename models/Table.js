const mongoose = require('mongoose')

const reservationSchema = require('./Reservation').schema;


let tableSchema = new mongoose.Schema({
    name : String,
    capacity : Number,
    location:String,
    isAvailable: Boolean,
    reservation: {
        required: false,
        type: reservationSchema
    }
})

let Table = mongoose.model('Table', tableSchema)

module.exports.model = Table;
module.exports.schema =tableSchema;