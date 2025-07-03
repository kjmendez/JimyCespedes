const sequelize = require('./config');
const { User, Task } = require('../models');

const syncDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con BD');

    await sequelize.sync({ force: false }); 
    console.log('Tablas sincronizadas correctamente');
  } catch (error) {
    console.error('Error al sincronizar:', error);
  }
};

module.exports = syncDatabase;
