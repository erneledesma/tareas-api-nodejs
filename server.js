
const express = require('express');
const dotenv = require('dotenv');
const conectarDB = require('./config/database');
const tareasRoutes = require('./routes/tareas');

dotenv.config();

const app = express();

//Conectar a la base de datos
conectarDB();

//Rutas
app.use('/api/tareas', tareasRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

