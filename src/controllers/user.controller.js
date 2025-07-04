const { User, Task } = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');


exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};


exports.createUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'username y password son requeridos' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      status: 'active'
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};


exports.getById = async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: ['username', 'status']
  });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
};


exports.updateUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await User.update(
    { username, password: hashedPassword },
    { where: { id: req.params.id } }
  );
  res.json(result);
};


exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const user = await User.findByPk(req.params.id);
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  user.status = status;
  await user.save();
  res.json(user);
};


exports.deleteUser = async (req, res) => {
  const result = await User.destroy({ where: { id: req.params.id } });
  res.json(result);
};


exports.getTasksByUser = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.params.id } });
  res.json(tasks);
};


exports.getPaginatedUsers = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    search = '',
    orderBy = 'id',
    orderDir = 'DESC'
  } = req.query;

  const offset = (page - 1) * limit;
  const where = search
    ? { username: { [Op.like]: `%${search}%` } }
    : {};

  const { count, rows } = await User.findAndCountAll({
    attributes: ['id', 'username', 'status'],
    where,
    limit: parseInt(limit),
    offset: parseInt(offset),
    order: [[orderBy, orderDir]]
  });

  res.json({
    total: count,
    page: parseInt(page),
    pages: Math.ceil(count / limit),
    data: rows
  });
};
