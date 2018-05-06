const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const userAuth = require("./routes/api/userAuth");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello world!"));

app.use("/api/users/", userAuth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port number ${port}`));
