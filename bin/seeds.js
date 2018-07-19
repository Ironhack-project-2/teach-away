require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");
const Aula = require("../models/Aula");
const Curso = require("../models/Curso");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const DATABASE = process.env.DBURL;
mongoose.connect(DATABASE);

/*
User.findOne({}, (err, user) => {
  userID = user._id;
  console.log("Este es el userID: "+userID);
  Aula.updateMany({}, { $push: { inscritos:  userID } }).then (()=> {console.log("OK");
  mongoose.disconnect();})
}).then (console.log("Ok 2"));
*/
User.collection.drop();
Curso.collection.drop();
Aula.collection.drop();

fechaClase= new Date();


// Creacion de Fechas de una sola clase por curso
let fechaFutura ={};
let fechaFutura2={};
fechaClase.setDate(fechaClase.getDate() + 7);
fechaFutura.fechaLeccion=fechaClase;
fechaFutura.vista=false;
fechaClase.setDate(fechaClase.getDate() + 9);
fechaFutura2.fechaLeccion=fechaClase;
fechaFutura2.vista=false;

const password = "1";
const hashPass = bcrypt.hashSync(password, bcryptSalt);

const users = [
  {
    username: "Nico",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    confirmationCode: bcrypt.hashSync("Nico", bcryptSalt),
    address: "C/Marc Pomar, 33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA"
  },
  {
    username: "Bruno",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    confirmationCode: bcrypt.hashSync("Bruno", bcryptSalt),
    address: "C/Marc Pomar, 33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA"
  },
  {
    username: "Kike",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    confirmationCode: bcrypt.hashSync("Kike", bcryptSalt),
    address: "C/Marc Pomar, 33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA"
  },
  {
    username: "Pablo",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    confirmationCode: bcrypt.hashSync("Pablo", bcryptSalt),
    address: "C/Marc Pomar, 33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA"
  },
  {
    username: "Giorgio",
    password: hashPass,
    status: "Active",
    isTeacher: true,
    confirmationCode: bcrypt.hashSync("Giorgio", bcryptSalt),
    address: "C/Marc Pomar, 33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA"
  }
];

const cursos = [
  {
    nombre: "Inglés",
    descripcion: "El mejor curso de la historia para aprender en cinco semanas",
    nivel: 1,
    lecciones: 6,
    isActive: true,
    profesor: null
  },
  {
    nombre: "Francés",
    descripcion: "Un curso para aprender frances con 5000 palabras.",
    nivel: 1,
    lecciones: 6,
    isActive: true,
    profesor: null
  }
];

const aulas = [
  {
    idCurso: null,
    idProfesor: null,
    alumnosMax: 5,
    leccionActual: 1,
    aulaNum: 1,
    fechas: [fechaFutura],
    checked: false,
    inscritos: [],
    asistentes: []
  },
  {
    idCurso: null,
    idProfesor: null,
    alumnosMax: 5,
    leccionActual: 1,
    aulaNum: 1,
    fechas: [fechaFutura2],
    checked: true,
    inscritos: [],
    asistentes: []
  }
];

// Confirmacion de creaccion tanto para movies como celebrities en consola.
User.create(users, (err, data) => {
  if (err) {
    throw err;
  }
})
  .then(() => {
    console.log("Usuarios creados");
    User.findOne({ username: "Giorgio" }).then(user => {
      Curso.create(cursos, (err, dataCursos) => {
        if (err) {
          throw err;
        }
      })
        .then(() => {
          console.log("Cursos creados");
          Curso.updateMany({}, { profesor: user._id }).then(answer => {
            Aula.create(aulas, (err, data) => {
              if (err) {
                throw err;
              }
            })
              .then(answer => {
                console.log("Aulas creadas");
                Aula.updateMany({}, { idProfesor: user._id }).then(() => {
                  console.log("Asignado profesor");
                  User.find({ username: { $ne: "Giorgio" } }).then(users => {
                    for (var j = 0; j < users.length; j++) {
                      userID = users[j]._id;
                      Aula.updateMany({}, { $push: { inscritos:  userID } }).then (()=> {console.log("OK")});
//                      Aula.updateMany({}, { $push: { asistentes:  userID } }).then (()=> {console.log("OK2")});
                    }
                    Curso.findOne({}).then(curso=>{Aula.updateMany({}, {idCurso : curso}).then(console.log("curso OK"))})
                    setTimeout(()=>{mongoose.disconnect(); console.log("desconectado")},4000);            
                  });
              });

            })
          .catch(err => {
                console.log("ERROR AULAS:" + err);
          });
        });
    })
    .catch(err => {
    console.log("ERROR CURSO:" + err);
    });
    });
  })
  .catch(err => {
    console.log("ERROR USER:" + err);
  }); 
