const express = require("express");
const passport = require("passport");
const setRoutes = express.Router();
const User = require("../models/User");

setRoutes.get("/userSettings", (req, res, next) => {
  user = res.locals.user;
  res.render("set/userSettings", { user });
});

setRoutes.post("/userSettings", (req, res, next) => {
    user = res.locals.user;




    
    res.render("set/confirmSettings", { user });
  });




module.exports = setRoutes;
