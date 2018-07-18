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

  Curso.find({ profesor : user._id}).sort({ created_at : -1})
  .then (cursos => {

    const obj = { user, cursos};
    res.render("teacher/teacherPanel", { obj });
  })
  .catch(err => {
    console.log(err);
    res.redirect("error");
  });
});

teacherRoutes.post("/teacherPanel", (req, res, next) => {
  const { nombre, descripcion, nivel, lecciones} = req.body;
  const profesor = res.locals.user._id;



const rol = req.body.role;
  if (nombre === "" || descripcion === "" || nivel === null || lecciones == null ) {
    res.render("/teacherPanel", { message: "Por favor rellena todos los campos" });
    return;
  }

  Curso.findOne({ nombre }, "nombre", (err, user) => {
    if (user !== null) {
      res.render("/teacherPanel", { message: "El nombre del curso ya existe" });
      return;
    }

    const newCurso = new Curso({
      nombre,
      descripcion,
      nivel,
      lecciones,
      profesor
    });

    newCurso.save((err) => {
      if (err) {
        res.render("/teacherPanel", { message: "Something went wrong" });
      } else {
        res.redirect("/teacher/teacherPanel");
      }
    // close save  
    });
    // close findOne
  });
  // close post
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