exports.getAllTasks = async (req, res) => {
    const tasks = await Task.findAll({ where: { userId: req.user.userId } });
    res.json(tasks);
  };
  
  exports.createTask = async (req, res) => {
    const { name } = req.body;
    const task = await Task.create({ name, done: false, userId: req.user.userId });
    res.json(task);
  };
  
  exports.getById = async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task || task.userId !== req.user.userId) return res.status(403).json({ error: 'Acceso denegado' });
    res.json({ name: task.name, done: task.done });
  };
  
  exports.updateTask = async (req, res) => {
    const result = await Task.update(
      { name: req.body.name },
      { where: { id: req.params.id, userId: req.user.userId } }
    );
    res.json(result);
  };
  
  exports.updateDone = async (req, res) => {
    const task = await Task.findByPk(req.params.id);
    if (!task || task.userId !== req.user.userId) return res.status(403).json({ error: 'Acceso denegado' });
    task.done = req.body.done;
    await task.save();
    res.json(task);
  };
  
  exports.deleteTask = async (req, res) => {
    const result = await Task.destroy({ where: { id: req.params.id, userId: req.user.userId } });
    res.json(result);
  };
  