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

  Curso.findById(id)
  .then (curso => {
    Aula.find({ idCurso: id }).sort({ created_at : -1}).then (aulas =>{
     const obj = { user, curso, aulas};
     res.render("curso/editarCurso", { obj });
    })
  })
  .catch(err => {
    console.log(err);
    res.redirect("error");
  });
}); 

cursoRoutes.post("/editarCurso/:id", (req, res, next) => {
  const {fecha , hora , numeroAlumnos} = req.body;
  today = new Date();
  fechaIni = new Date(fecha+"T"+hora);
  idCurso = req.params.id;
  idProfesor = res.locals.user._id;
  user=res.locals.user;
  dias=fechaIni-today;


  if (today >= fechaIni || numeroAlumnos === null ) {
    res.render("curso/editarCurso", { message: "Error en la forma" });
    return;
  }

  Curso.findById(idCurso).then( curso => {

  lecciones = curso.lecciones;

    Aula.find({ idCurso }).sort({ created_at : -1}).then ( aulas => {

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
    console.log("=======Aulas ====");
    console.log(aulas);
    console.log("===============")
    if (aulas != null) {  
          for (let j=0; j < fechasArray.length; j++){
            for(let i=0; i < aulas[i].fechas.length; i++){
                diff = fechasArray[j]-aulas.fechas.fechaLeccion[i];
                console.log(`Diff es: ${diff}`);
                if ((diff > -3600000) && (diff < 3600000)){
                  console.log("ERROR: Hay coincidencia de fechas");
                  res.render("curso/editarCurso", { message: "Conflicto con fechas escogidas" });                 
                }
            }
          }       
      }

      const newAula = new Aula({
        idCurso,
        idProfesor,
        alumnosMax: numeroAlumnos,
        leccionActual: 1,
        fechas: fechasArray,
        inscritos: null
      });
      
      aulas.unshift(newAula);
      const obj = { user, curso, aulas };   

      newAula.save((err) => {

        if (err) {
          res.render("curso/editarCurso", { message: "Something went wrong" });
        } else {
       
          res.render("curso/editarCurso", { obj });
        }
      // close save  
      });
    // close find aulas
    })
    // close findOne curso
  });
  // close post
})


cursoRoutes.get("/listadoCursos", (req, res, next) => {
  user = res.locals.user;

  Curso.find({ isActive : true}).sort({ created_at : -1})
  .then (cursos => {

    const obj = { user, cursos};
    res.render("curso/listadoCursos", { obj });
  })
  .catch(err => {
    console.log(err);
    res.redirect("error");
  });
});


module.exports = cursoRoutes;
