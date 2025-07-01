const User = require('./user.model');
const Task = require('./task.model');

// Relación uno a muchos
User.hasMany(Task, {
  foreignKey: 'user_id',
  as: 'tasks'
});

Task.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user'
});

module.exports = {
  User,
  Task
};
