const express = require("express");
const passport = require("passport");
const setRoutes = express.Router();
const User = require("../models/User");

setRoutes.get("/userSettings", (req, res, next) => {
  user = res.locals.user;
  res.render("set/userSettings", { user });
});

setRoutes.post("/userSettings", (req, res) => {
  user = res.locals.user;
  const { username, password, email } = req.body;
  console.log(user._id)
  User.findByIdAndUpdate(user._id,{username, password, email})
  .then(user => {
    res.render("set/confirmSettings", { user });
  });
});

module.exports = setRoutes;
