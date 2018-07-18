const express = require("express");
const passport = require("passport");
const cursoRoutes = express.Router();
const User = require("../models/User");
const Curso = require("../models/Curso");
const Aula = require("../models/Aula");

const {
  ensureLoggedIn,
  ensureLoggedOut,
  isTeacher
} = require("../middleware/ensureLogin");

cursoRoutes.get("/editarCurso/:id", (req, res, next) => {
  id = req.params.id;
  user = res.locals.user;

  Curso.findById(id)
  .then (curso => {
    Aula.find({ idCurso: id }).sort({ created_at : -1}).then (aulas =>{
     const obj = { user, curso, aulas};
     res.render("curso/editarCurso", { obj });
    })
    .catch(err => {
      console.log(err);
      res.redirect("error");
    });
  });
})

cursoRoutes.post("/editarCurso/:id", (req, res, next) => {
  const { fecha, hora, numeroAlumnos } = req.body;
  today = new Date();
  fechaIni = new Date(fecha + "T" + hora);
  idCurso = req.params.id;
  idProfesor = res.locals.user._id;
  user = res.locals.user;
  dias = fechaIni - today;

  if (today >= fechaIni || numeroAlumnos === null) {
    res.render("curso/editarCurso", { message: "Error en la forma" });
    return;
  }

  Curso.findById(idCurso).then( curso => {

    lecciones = curso.lecciones;

    Aula.find({ idCurso }).sort({ created_at : -1}).then ( aulas => {

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
            for(let i=0; i < aulas.length; i++){
              for (let k=0; k < aulas[i].fechas.length; k++){
                // console.log("=======Fechas ====");
                // console.log(fechasArray[j]);
                // console.log(aulas[i].fechas[k].fechaLeccion);
                // console.log("===============");               
                diff = fechasArray[j].fechaLeccion-aulas[i].fechas[k].fechaLeccion;
                console.log(`Diff es: ${diff}`);
                if ((diff > -3600000) && (diff < 3600000)){
                  console.log("ERROR: Hay coincidencia de fechas");
                  message = "Conflicto con fechas escogidas";
                  const obj = { user, curso, aulas, message };
                  res.render("curso/editarCurso", { obj });
                  return;                 
                }
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
        inscritos: []
      });
      
       aulas.unshift(newAula);
        const obj = { user, curso, aulas };
        console.log(aulas[0]._id, "<--------");
        Curso.findByIdAndUpdate(idCurso, {
          $push: { aulas: aulas[0]._id }
        }).then(() => {
          newAula.save(err => {
            if (err) {
              res.render("curso/editarCurso", {
                message: "Something went wrong"
              });
            } else {
              res.render("curso/editarCurso", { obj });
            }
          });

          // close save
        });
        // close find aulas
      });
    // close findOne curso
  });
  // close post
});

cursoRoutes.get("/listadoCursos", (req, res, next) => {
  user = res.locals.user;
  Curso.find({ isActive: true })
    .populate("aulas")
    .then(curso => {
      res.render("curso/listadoCursos", { curso });
    })
    .catch(err => {
  //    console.log(err);
      res.redirect("error");
    });
});

cursoRoutes.get("/apuntame/:id", (req, res, next) => {
  const user = res.locals.user;
  const idAula= req.params.id;
  console.log("==== REQ PARAMS ====");
  console.log(idAula);

  Aula.findById({_id:idAula}).then(aula => {
      console.log(aula)
        if (aula.inscritos.length < aula.alumnosMax){
          Aula.findByIdAndUpdate({_id:idAula}, {
            $push: { inscritos: user._id }
          }).then(()=> {
                  Curso.findById(aula.idCurso).then (curso => {
                  obj = { user, curso, aula }
                  User.findByIdAndUpdate({_id: user._id}, {
                    $push: { aulas: idAula }
                  }).then (()=>{
                    console.log("INSERTADO USUARIO EN AULA")
                    res.render("student/userPanel", { user });
                })
            })
        })
      .catch(err => {
         console.log(err);

      });
    } else {
      console.log("SE HA EXCEDIDO LA CAPACIDAD DEL CURSO. NO PUEDE INSCRIBIRSE");
      res.render("", { message: "Se ha excedido la capacidad. No puede apuntarse a estas aulas"})
    }
  })
  .catch(err => {
     console.log(err);
  });

});

module.exports = cursoRoutes;
