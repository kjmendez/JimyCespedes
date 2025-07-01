require('dotenv').config();
const app = require('./src/app');
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
