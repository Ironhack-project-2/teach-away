const express = require("express");
const passport = require('passport');
const cursoRoutes = express.Router();
const User = require("../models/User");
const Curso = require("../models/Curso");
const Aula = require("../models/Aula");

const { ensureLoggedIn, ensureLoggedOut, isTeacher} = require("../middleware/ensureLogin");

cursoRoutes.get("/editarCurso/:id", (req, res, next) => {
  id = req.params.id;
  user = res.locals.user;
  console.log(id);
  console.log(`Este es el user ID: ${user._id}`);
  Curso.findById(id)
  .then (curso => {
    console.log(curso);
     console.log(`Lilstado del Curso: ${curso}`)
     const obj = { user, curso};
     res.render("curso/editarCurso", { obj });
  })
  .catch(err => {
    console.log(err);
    res.redirect("error");
  });
});

cursoRoutes.post("/editarCurso/:id", (req, res, next) => {
  const {fecha , hora , numeroAlumnos} = res.body;
  today = new Date();
  id = req.params.id;
  user = res.locals.user;

  if (nombre === "" || descripcion === "" || nivel === null || lecciones == null ) {
    res.render("/teacherPanel", { message: "Por favor rellena todos los campos" });
    return;
  }

  Curso.findOne({ nombre }, "nombre", (err, user) => {
    if (user !== null) {
      res.render("/teacherPanel", { message: "El nombre del curso ya existe" });
      return;
    }

    const newAula = new Aula({
      nombre,
      descripcion,
      nivel,
      lecciones,
      profesor
    });

    newAula.save((err) => {
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









module.exports = cursoRoutes;