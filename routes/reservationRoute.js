const express = require('express')
const mongoose = require('mongoose')
const Day = require('../models/Day').model
const Reservation = require('../models/Reservation').model

const router = express.Router()


/**
 * parameters--
 * date, phone, table, name, email
 */

router.post('/', (req,res) => {
    Day.find({date: req.body.date}, (err, days)=>{
        if(!err){
            if(days.length >0){
                let days = days[0]
                days.tables.array.forEach(table => {
                    if(table._id == req.body.table){
                        //correct table is table
                        table.reservation = new Reservation({
                            name: req.body.name,
                            phone: req.body.phone,
                            email: req.body.email
                        })
                        table.isAvailable =false
                        days.save(err => {
                            if(err){
                                console.log(err)
                            }else{
                                console.log('reserved')
                                res.status(200).send('added reservation')
                            }
                        })
                    }
                })
            }else{
                console.log('day not found')
            }
        }
    })
})

module.exports =router