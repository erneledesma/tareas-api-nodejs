const express = require('express');
const router = express.Router();
const Tarea = require('../models/Tarea');

// Crear una nueva tarea
router.post('/', async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener una tarea específica
router.get('/:id', getTarea, (req, res) => {
  res.json(res.tarea);
});

// Actualizar una tarea
router.patch('/:id', getTarea, async (req, res) => {
  if (req.body.titulo != null) {
    res.tarea.titulo = req.body.titulo;
  }
  if (req.body.descripcion != null) {
    res.tarea.descripcion = req.body.descripcion;
  }
  if (req.body.estado != null) {
    res.tarea.estado = req.body.estado;
  }
  try {
    const tareaActualizada = await res.tarea.save();
    res.json(tareaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Eliminar una tarea
router.delete('/:id', getTarea, async (req, res) => {
  try {
    await res.tarea.remove();
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para obtener una tarea por ID
async function getTarea(req, res, next) {
  let tarea;
  try {
    tarea = await Tarea.findById(req.params.id);
    if (tarea == null) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.tarea = tarea;
  next();
}

module.exports = router;