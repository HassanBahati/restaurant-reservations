//proccessses all tables json into mongo table 
const mongoose = require('mongoose')
const table = require('../models/Table').model
const fs = require('fs')

let tableData = fs.readFileSync(__dirname + '/allTables.json')
tableData = JSON.parse(tableData).tables;

let allTables = []
tableData.forEach(table => {
    allTables.push(new Table(table))
})