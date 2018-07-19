const express = require("express");
const passport = require('passport');
const userRoutes = express.Router();
const User = require("../models/User");

const nodemailer = require('nodemailer');
const { ensureLoggedIn, ensureLoggedOut, isTeacher} = require("../middleware/ensureLogin");

userRoutes.get("/studentPanel", (req, res, next) => {
  user = res.locals.user;
  res.render("student/userPanel", { user });
});

module.exports = userRoutes;
