const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const aulaSchema = new Schema({
  idCurso: { type : Schema.Types.ObjectId, ref: 'Curso' },
  idProfesor:  { type : Schema.Types.ObjectId, ref: 'User' } ,
  alumnosMax: Number,
  leccionActual: Number,
  contenido: { type: String, default: "https://hangouts.google.com/hangouts/_/pf5npsskmjgt3btpr3u6jw65zee" },
  fechas: [{fechaLeccion :Date,
            vista: { type :Boolean, default : false} }],
  inscritos: [ { type : Schema.Types.ObjectId, ref: 'User' } ],


}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Aula = mongoose.model('Aula', aulaSchema);
module.exports = Aula;