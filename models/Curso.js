const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const cursoSchema = new Schema({
  nombre: String,
  descripcion: String,
  nivel: Number,
  lecciones: Number,
  aulas: [ { type : Schema.Types.ObjectId, ref: 'Aula' } ],
  profesor:  { type : Schema.Types.ObjectId, ref: 'User' } ,
  isActive: { type :Boolean, default : true}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Curso = mongoose.model('Curso', cursoSchema);
module.exports = Curso;