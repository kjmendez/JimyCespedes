const express = require('express');
const router = express.Router();
const authenticateToken = require('../middlewares/auth.middleware');
const taskController = require('../controllers/task.controller');

router.get('/', authenticateToken, taskController.getAllTasks);
router.post('/', authenticateToken, taskController.createTask);
router.get('/:id', authenticateToken, taskController.getById);
router.put('/:id', authenticateToken, taskController.updateTask);
router.patch('/:id', authenticateToken, taskController.updateDone);
router.delete('/:id', authenticateToken, taskController.deleteTask);

module.exports = router;
