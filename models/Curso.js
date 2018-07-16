const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cursoSchema = new Schema({
  nombre: String,
  nivel: Number,
  claseActual: Number,  
  clases: [ { type : ObjectId, ref: 'Clase' } ],
  profesores: [ { type : ObjectId, ref: 'User' } ],
  isActive: Boolean,
  costo: Number,

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;