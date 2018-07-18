const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  status: { type: String, enum: ["Pending Confirmation", "Active"], default : "Pending Confirmation" },
  isTeacher: { type: Boolean, default: false },
  confirmationCode: { type: String, unique: true },
  email: String,
  address: String,
  fechaAlta: { type: Date, default: Date.now},
  avatar: String,
  suscrito: [ { idAula : { type : Schema.Types.ObjectId, ref: 'Aula' },
            idCurso : { type : Schema.Types.ObjectId, ref: 'Curso' } } ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
