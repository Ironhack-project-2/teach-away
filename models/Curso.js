const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cursoSchema = new Schema({
  nombre: String,
  descripcion: String,
  nivel: Number,
  aulas: [ { type : ObjectId, ref: 'Aula' } ],
  profesores:  { type : ObjectId, ref: 'User' } ,
  isActive: Boolean

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;