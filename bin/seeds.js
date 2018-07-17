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
const hashPass = bcrypt.hashSync(password, salt);

const users = [
  {
    username: "Nico",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    address: "C/Marc Pomar, 33",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA",
  },
  {
    username: "Bruno",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    address: "C/Marc Pomar, 33",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA",
  },
  {
    username: "Kike",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    address: "C/Marc Pomar, 33",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA",
  },
  {
    username: "Pablo",
    password: hashPass,
    status: "Active",
    isTeacher: false,
    address: "C/Marc Pomar, 33",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA",
  },
  {
    username: "Giorgio",
    password: hashPass,
    status: "Active",
    isTeacher: true,
    address: "C/Marc Pomar, 33",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37bXcPGRn6mPmyGq7kZSSVqh238jjBPtIsL5IiCDCthy32nunBA",
  },
];

/*
const cursos = [
    {
    nombre: "Inglés",
    descripcion: "El mejor curso de la historia para aprender en cinco semanas",
    nivel: 1,
    aulas: new Types.ObjectId(),
    profesor:""
    isActive:true
},

{
    nombre: "Francés",
    descripcion: "Un curso para aprender frances con 5000 palabras.",
    nivel: 2,
    aulas:
    profesor:""
    isActive:true
}
  ];

  idCurso: { type : ObjectId, ref: 'Curso' },
  idProfesor:  { type : ObjectId, ref: 'User' } ,
  aulaNum: Number,
  contenido: [ { type: String } ],
  fecha: Date,
  checked: Boolean,
  inscritos: [ { type : ObjectId, ref: 'User' } ],
  asistentes: [ { type : ObjectId, ref: 'User' }]



  const aulas = [
    {
        idCurso: "Inglés",
        idProfesor: "El mejor curso de la historia para aprender en cinco semanas",
        aulaNum: 1,
        contenido:
        fecha:""
        checked:true,
        inscritos:
        asistentes:
},

{
    idCurso: "Inglés",
    idProfesor: "El mejor curso de la historia para aprender en cinco semanas",
    aulaNum: 1,
    contenido:
    fecha:""
    checked:true,
    inscritos:
    asistentes:
},
  ];

  
*/

// Confirmacion de creaccion tanto para movies como celebrities en consola.

User.create(users, (err, data) => {
  if (err) {
    throw err;
  }
  console.log(`Created ${users.length} users`);
});

Curso.create(cursos, (err, data) => {
  if (err) {
    throw err;
  }
  console.log(`Created ${cursos.length} cursos`);
});
