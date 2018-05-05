const express = require("express");
const mongoose = require("mongoose");

const userAuth = require("./routes/api/userAuth");

const app = express();

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) => res.send("Hello world!"));

app.use("/user/", userAuth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port number ${port}`));
