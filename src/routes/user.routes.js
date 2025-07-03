const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth.middleware');
const userController = require('../controllers/user.controller');

// Rutas públicas
router.get('/', userController.getAllUsers); // Obtener todos usuarios
router.post('/', userController.createUser); // Crear usuario

// Rutas protegidas
router.get('/list/pagination', userController.getPaginatedUsers);
//router.get('/list/pagination', authenticateToken, userController.getPaginatedUsers);
router.get('/:id', authenticateToken, userController.getById);
router.put('/:id', authenticateToken, userController.updateUser);
router.patch('/:id', authenticateToken, userController.updateStatus);
router.delete('/:id', authenticateToken, userController.deleteUser);
router.get('/:id/tasks', authenticateToken, userController.getTasksByUser);

module.exports = router;
