var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var mongoose = require("mongoose");
var slug = require("slug");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var dashboardRouter = require("./routes/dashboard");

mongoose.connect(
  "mongodb://localhost/trello_api",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    console.log("connected", err ? false : true);
  }
);

// Instantiate express
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/:profileSlug/", dashboardRouter);

module.exports = app;
