const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = 5000; //on 3000 port the express server is running on
const app = express(); //create an instance if express
const api = require("./routes/api");
app.use(bodyParser.json()); //specify the bodyparser to handle the json data
app.use(cors());
const db =
  "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"; //get the link of the database

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.error("Error!" + err);
  });

app.use("/api", api);
app.get("/", function (req, res) {
  res.send("hello from server");
});

app.listen(PORT, function () {
  console.log("server running on:" + PORT);
});
