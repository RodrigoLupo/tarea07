const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');

  // Cargar los modelos antes de la transferencia de datos
  require('./Category');
  require('./Recipe');

  console.log('Modelos cargados');

  // Transferir los datos JSON
  const dataDir = path.join(__dirname, '../..', 'MongoDB Data');

  // Leer los archivos JSON y transferirlos
  fs.readdirSync(dataDir).forEach(file => {
    const filePath = path.join(dataDir, file);
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Usar el nombre del archivo como el nombre de la colección
    const collectionName = file.split('.')[0];

    // Insertar los datos en la colección
    mongoose.connection.collection(collectionName).insertMany(jsonData, (err, res) => {
      if (err) {
        console.error(`Error al insertar en ${collectionName}:`, err);
      } else {
        console.log(`Datos insertados en ${collectionName}`);
      }
    });
  });
});
