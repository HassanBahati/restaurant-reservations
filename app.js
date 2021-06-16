const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const db = mongoose.connection;

require("dotenv").config;
const app = express();

//mongodb
mongoose.connect('mongodb://localhost/Pizza', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.get('/', (req,res)=>{
    console.log('this toot api handler')
})

//middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/reserve", require("./routes/reservationRoute"));
app.use('/availability', require('./routes/availabilityRoute'))

db.on("error", console.error.bind(console, "connection errror"));
db.once("open", (_) => {
  console.log("Connected to db");
});

app.listen(5000, ()=>{
  console.log('Server started at port 5000')
})

module.exports = app;
