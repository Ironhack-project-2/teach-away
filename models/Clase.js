const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const claseSchema = new Schema({
  idCurso: { type : ObjectId, ref: 'Curso' },
  claseNum: Number,
  contenido: [ { type: String } ],
  fecha: Date,
  isActive: Boolean,
  inscritos: [ { type : ObjectId, ref: 'User' } ],
  asistentes: [ { type : ObjectId, ref: 'User' } ],
  profesorID:  { type : ObjectId, ref: 'User' } 
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Clase = mongoose.model('Clase', claseSchema);
module.exports = Clase;