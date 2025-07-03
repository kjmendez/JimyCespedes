const { DataTypes } = require('sequelize');
const sequelize = require('../database/config');
const User = require('./user.model');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id', 
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'tasks',
  timestamps: false
});

module.exports = Task;
