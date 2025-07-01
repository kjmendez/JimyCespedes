const sequelize = require('./config');
const { User, Task } = require('../models');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión establecida con MySQL');

    await sequelize.sync({ force: false }); // true para borrar y recrear
    console.log('✅ Tablas sincronizadas correctamente');
  } catch (error) {
    console.error('❌ Error al sincronizar:', error);
  }
};

module.exports = syncDatabase;
