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
  const {fecha , hora , numeroAlumnos} = req.body;
  today = new Date();
  fechaIni = new Date(fecha+"T"+hora+"Z");
  idCurso = req.params.id;
  idProfesor = res.locals.user._id;
  user=res.locals.user;
  dias=fechaIni-today;


  if (today >= fechaIni || numeroAlumnos === null ) {
    res.render("curso/editarCurso", { message: "Error en la forma" });
    return;
  }

  Curso.findById(idCurso).then( curso => {
  console.log("Id del curso: "+ idCurso);
  console.log("Este es el curso:" + curso)
  lecciones = curso.lecciones;

  /*  idCurso: { type : Schema.Types.ObjectId, ref: 'Curso' },
    idProfesor:  { type : Schema.Types.ObjectId, ref: 'User' } ,
    alumnosMax: Number,
    leccionActual: Number,
    contenido: [ { type: String } ],
    fechas: [{fechaLeccion :Date,
              vista: { type :Boolean, default : false} }],
    inscritos: [ { type : Schema.Types.ObjectId, ref: 'User' } ],*/

    fechasArray = [];
    fechacont = fechaIni;
    for (var i=0; i < lecciones;i++){
        objArray = { fechaLeccion: new Date(fechacont), vista: false}
        fechasArray.push(objArray);
        fechacont.setDate(fechacont.getDate() + 7);
    }
    const newAula = new Aula({
      idCurso,
      idProfesor,
      alumnosMax: numeroAlumnos,
      leccionActual: 0,
      fechas: fechasArray,
      inscritos: null
    });
    const obj = { user, curso};
    newAula.save((err) => {
      if (err) {
        res.render("curso/editarCurso", { message: "Something went wrong" });
      } else {
        res.redirect("curso/editarCurso", { obj });
      }
    // close save  
    });
    // close findOne
  });
  // close post
})


cursoRoutes.get("/listadoCursos", (req, res, next) => {
  user = res.locals.user;
  console.log(user._id);
  Curso.find({ isActive : true}).sort({ created_at : -1})
  .then (cursos => {
    console.log(`Cursos: ${cursos}`)
    const obj = { user, cursos};
    res.render("curso/listadoCursos", { obj });
  })
  .catch(err => {
    console.log(err);
    res.redirect("error");
  });
});


module.exports = cursoRoutes;
