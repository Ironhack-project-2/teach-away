const express = require("express");
const passport = require('passport');
const teacherRoutes = express.Router();
const User = require("../models/User");
const Curso = require("../models/Curso");
const Aula = require("../models/Aula");

const nodemailer = require('nodemailer');
const { ensureLoggedIn, ensureLoggedOut, isTeacher} = require("../middleware/ensureLogin");


teacherRoutes.get("/teacherPanel", (req, res, next) => {
  user = res.locals.user;
  Curso.find({ pofesor : user._id})
  .then (cursos => {
    console.log(`Cursos: ${cursos}`)
    res.render("teacher/teacherPanel", { user, cursos });
  })
  .catch(err => {
    console.log(err);
    res.redirect("error");
  });
});

/*
router.post("/becomeTeacher", (req, res, next) => {
  user = res.locals.user;
  User.findByIdAndUpdate(user._id, { isTeacher: true })
    .then(() => {
      console.log(`Usuario ${user.username} se ha convertido a profesor`);
      user.isTeacher=true;
      res.render("teacher/teacherPanel", { user });
    })
    .catch(err => {
      console.log(err);
      res.redirect("/userPanel");
    });
});*/

module.exports = teacherRoutes;