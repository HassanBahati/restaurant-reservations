const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()



router.post('/', (req,res) => {
    console.log('request attempted')
    console.log(req.body)
    
    const dateTime = new Date(req.body.date)
    Day.find({date: dateTime}, (err, docs) => {
        if(!err){
            if(docs.length > 0){
                //record already exists
                console.log('record exists, sent docs')
                res.status(200).send(docs[0])
            }else{
                //search date doesnt exist and we need to create it 
                const allTables = require('../data/allTables')
                const day = new Day({
                    date: dateTime,
                    tables: allTables
                })
                day.save(err => {
                    if(err){
                        res.status(400).send('error saving new date')
                    }else{
                        //saved date and need to return all tables
                        console.log('created new date. here are all default docs')
                        Day.find({date: dateTime}, (err, docs) =>{
                            err ? res.sendStatus(400) : res.status(200).send([0])
                        })
                    }
                })
            }
        }else{
            res.send(400).send('could not search for date')
        }
    })
})

module.exports =router