require('dotenv').config();
const app = require('./app'); // ✔️ Ya contiene express y las rutas
const syncDatabase = require('./database/sync');

const PORT = process.env.PORT || 3000;

// Sincronizar base de datos y arrancar servidor
syncDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error al iniciar la aplicación:', err);
  });
