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
User.collection.drop();
Curso.collection.drop();
Aula.collection.drop();

const password = "1";
const hashPass = bcrypt.hashSync(password, bcryptSalt);
const users = [
  {
    username: "Nico",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    address: "C/Marc Pomar, 33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA"
  },
  {
    username: "Bruno",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    address: "C/Marc Pomar, 33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA"
  },
  {
    username: "Kike",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    address: "C/Marc Pomar, 33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA"
  },
  {
    username: "Pablo",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    address: "C/Marc Pomar, 33",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA"
  },
  {
    username: "Giorgio",
    password: hashPass,
    status: "Active",
    isTeacher: true,
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
    isActive: true,
    profesor: null
  },
  {
    nombre: "Francés",
    descripcion: "Un curso para aprender frances con 5000 palabras.",
    nivel: 2,
    isActive: true,
    profesor: null
  }
];

const aulas = [
  {
    idCurso: null,
    idProfesor: null,
    aulaNum: 1,
    contenido: null,
    fecha: null,
    checked: true,
    inscritos: [],
    asistentes: []
  },
  {
    idCurso: null,
    idProfesor: null,
    aulaNum: 1,
    contenido: null,
    fecha: null,
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
                Aula.updateMany({}, { idProfesor: user._id }).then(() => {mongoose.disconnect();})
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
