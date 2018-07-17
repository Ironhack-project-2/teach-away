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


module.exports = cursoRoutes;