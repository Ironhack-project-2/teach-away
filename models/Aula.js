const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const aulaSchema = new Schema({
  idCurso: { type : ObjectId, ref: 'Curso' },
  idProfesor:  { type : ObjectId, ref: 'User' } ,
  aulaNum: Number,
  contenido: [ { type: String } ],
  fecha: Date,
  checked: Boolean,
  inscritos: [ { type : ObjectId, ref: 'User' } ],
  asistentes: [ { type : ObjectId, ref: 'User' }]

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Aula = mongoose.model('Aula', aulaSchema);
module.exports = Aula;