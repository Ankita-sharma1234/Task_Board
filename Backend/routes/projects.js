const express = require('express');
const { createProject, getProjects, deleteProject, getProject } = require('../controllers/projectController');
const auth = require('../middlewares/auth');
const taskRoutes = require('./tasks');

const router = express.Router();

router.use(auth);

router.post('/', createProject);
router.get('/', getProjects);
router.get('/:id', getProject);
router.delete('/:id', deleteProject);

router.use('/:projectId/tasks', taskRoutes);

module.exports = router;