const express = require('express');
const app = express();

const usersRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/task.routes');



app.use(express.json());

// Montar ruta para usuarios
app.use('/api/users', usersRoutes);
app.use('/api', authRoutes);
app.use('/api/tasks', taskRoutes);

module.exports = app;
