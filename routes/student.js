const express = require("express");
const passport = require('passport');
const userRoutes = express.Router();
const User = require("../models/User");
const Curso = require("../models/Curso");
const Aula = require("../models/Aula");

const nodemailer = require('nodemailer');
const { ensureLoggedIn, ensureLoggedOut, isTeacher} = require("../middleware/ensureLogin");

// const getAulas = (index, ) => {
//   return new Promise((resolve, reject) => {
//     Aula.findOne(userInfo.suscritos[index].idAula)
//   })
// }
function fechaAulaActiva(date1, date2){
  console.log("================ RESTA DE FECHAS =====");
  console.log("fecha1: " + date1 + " fecha 2: "+ date2);
  d2 = new Date(date2);
  d1 = new Date(date1);
  
  console.log(date2-date1);
  if ((date2-date1) < 86400000){
    
    return true;
  } else {
    return false;
  }
}

userRoutes.get("/studentPanel", (req, res, next) => {
  user = res.locals.user;
  const arr = [];
  User.findById(user._id).then(userInfo=>{
    console.log('userInfo')
    console.log(userInfo.suscrito)
    numCursos = userInfo.suscrito.length; 
    for (var i=0; i < numCursos; i++){
      arr.push(Aula.findOne(userInfo.suscrito[i].idAula).populate('idCurso'))
    }
    Promise.all(arr)
    .then (aulas => {
      console.log("============= AULAS ==========");
      console.log(aulas)
      const obj = { user, aulas };
      let today = new Date();
      for (var i=0; i < aulas.length; i++){
        for (var j=0; j < aulas[i].fechas.length; j++){
          console.log(aulas[i].fechas[j].fechaLeccion);
          if (fechaAulaActiva(today, aulas[i].fechas[j].fechaLeccion)){
            aulas[i].fechas[j].vista = true;
          }
        }
      }
      res.render("student/userPanel", {obj});
    })

  })
});

module.exports = userRoutes;
