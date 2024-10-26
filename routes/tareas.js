
const express = require('express');
const router = express.Router();
const Tarea = require('../model/Tarea');

//Crear una nueva tarea
router.post('/', async (req, res) => {
    try {
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.status(201).json({ mensaje: 'Tarea creada correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al crear la tarea' });
    }
});

//Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.json(tareas);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al obtener las tareas' });
    }
});

//Obtener una tarea por su id
router.get('/:id', (req, res) => {
    res.json(res.tarea);
});

//Actualizar una tarea
router.patch('/:id',  async (req, res) => {
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
    }
    catch (error) {
        res.status(400).json({ mensaje: 'Error al actualizar la tarea' });
    }
});

//Eliminar una tarea
router.delete('/:id', async (req, res) => {
    try {
        await res.tarea.remove();
        res.json({ mensaje: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al eliminar la tarea' });
    }
});

module.exports = router;

