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
      res.render("student/userPanel", {obj});
    })

  })
});

module.exports = userRoutes;
