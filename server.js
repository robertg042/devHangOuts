const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const userAuth = require("./routes/api/userAuth");

const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err));

// passport middleware - important: must be after mongoose connection
app.use(passport.initialize());
// passport config
require("./config/passport")(passport);

app.get("/", (req, res) => res.send("Hello world!"));

app.use("/api/users/", userAuth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Running on port number ${port}`));

// Fix for nodemon's listen EADDRINUSE error
if (process.env.NODE_ENV !== "production") {
  process.on("SIGUSR2", () => {
    process.exit(0);
  });
}
