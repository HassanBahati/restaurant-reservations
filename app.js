const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const db = mogoose.connection;

require("dotenv").config;
const app = express();

//mongodb
mongoose.connect(process.env.MONGO_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.router('/', (req,res)=>{
    console.log('this toot api handler')
})

//middleware
app.use(cors());
app.use(logger("dev"));
app.use(express.json);
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use("/", require("./routes/index.css"));
app.use("/reserve", require("./routes/reservationRoute"));
app.use('/availability', require('./routes/availabilityRoute'))

db.on("error", console.error.bind(console, "connection errror"));
db.once("open", (_) => {
  console.log("Connected to db");
});

module.exports = app;
