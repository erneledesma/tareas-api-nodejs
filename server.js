const express = require('express');
const mongoose = require('mongoose');
const tareasRoutes = require('./routes/tareas');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/tareas', tareasRoutes);

const connectWithRetry = () => {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('MongoDB conectado exitosamente');
      startServer();
    })
    .catch(err => {
      console.log('Error de conexión a MongoDB:', err);
      console.log('Reintentando en 5 segundos...');
      setTimeout(connectWithRetry, 5000);
    });
};

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

connectWithRetry();