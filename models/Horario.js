const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const horarioSchema = new Schema({
  fecha: Date,
  profesorID:  { type : ObjectId, ref: 'Profesor' },
  isActive: Boolean,
  idClase: { type : ObjectId, ref: 'Clase' },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Horario = mongoose.model('Horario', horarioSchema);
module.exports = Clase;