const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

//middlewares
app.use(cors());
app.use(bodyparser.json());
app.use(
  bodyparser.urlencoded({
    extended: true,
  })
);

app.use("/users", require("./users/users"));

//connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connnected to DB");
  },
  (err) => {
    console.error(`error connecting to DB: ${err}`);
  }
);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
