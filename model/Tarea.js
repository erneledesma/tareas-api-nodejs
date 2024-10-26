
const mongoose = require('mongoose');

const TaraeaSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type:String,
        enum: ['pendiente', 'en proceso', 'terminada'],
        default: 'pendiente'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Tarea', TaraeaSchema);