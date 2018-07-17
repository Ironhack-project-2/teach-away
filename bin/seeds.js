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
    contenido: "https://www.youtube.com/watch?v=NdXPnJLR07E",
    fecha: null,
    checked: false,
    inscritos: [],
    asistentes: []
  },
  {
    idCurso: null,
    idProfesor: null,
    aulaNum: 2,
    contenido: "https://www.youtube.com/watch?v=rXme31-HVw0",
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
                Aula.updateMany({}, { idProfesor: user._id }).then(() => {
                  console.log("Asignado profesor");
                  User.find({ username: { $ne: "Giorgio" } }).then(users => {
                    const promisesArray = [];
                    for (var j = 0; j < users.length; j++) {
                      userID = users[j]._id;
//                      console.log(`Antes de entrar a insertar a: ${userID}, ${users[j].username}`)
//                      promisesArray.push(new Promise(resolve => {
                        Aula.updateMany({}, { $push: { inscritos:  userID } }).then (()=> {console.log("OK")});
                        Aula.updateMany({}, { $push: { asistentes:  userID } }).then (()=> {console.log("OK2")});
//                                                                }));
                    }
                    Curso.findOne({}).then(curso=>{Aula.updateMany({}, {idCurso : curso}).then(console.log("curso OK"))})
                    setTimeout(()=>{mongoose.disconnect(); console.log("desconectado")},4000);
//                    Promise.all(promisesArray)
//                     .then(answer=> {console.log("Todo OK"+answer);
//                                      mongoose.disconnect();
//                                    }) 
//                      .catch(err => console.log("ERROR: "+ err))               
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
