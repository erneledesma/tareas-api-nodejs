const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['pendiente', 'en progreso', 'completada'],
    default: 'pendiente'
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
}, { 
  bufferCommands: false,
  bufferTimeoutMS: 30000 // Aumenta el tiempo de espera a 30 segundos
});

module.exports = mongoose.model('Tarea', TareaSchema);