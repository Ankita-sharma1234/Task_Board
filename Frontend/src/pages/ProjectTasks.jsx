import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { taskAPI, projectAPI } from '../api/api';

const ProjectTasks = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [project, setProject] = useState(null);
	const [tasks, setTasks] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [newTask, setNewTask] = useState({ title: '', assignedTo: '', dueDate: '' });
	const [editingTask, setEditingTask] = useState(null);

	useEffect(() => {
		fetchProject();
		fetchTasks();
	}, [id]);

	const fetchProject = async () => {
		try {
			const response = await projectAPI.getOne(id);
			setProject(response.data);
		} catch (err) {
			setError('Failed to fetch project');
		}
	};

	const fetchTasks = async () => {
		try {
			const response = await taskAPI.getAll(id);
			setTasks(response.data);
		} catch (err) {
			setError('Failed to fetch tasks');
		} finally {
			setLoading(false);
		}
	};

	const handleCreateTask = async (e) => {
		e.preventDefault();
		try {
			await taskAPI.create(id, { ...newTask, status: 'todo' });
			setNewTask({ title: '', assignedTo: '', dueDate: '' });
			fetchTasks();
		} catch (err) {
			setError('Failed to create task');
		}
	};

	const handleUpdateTask = async (taskId, data) => {
		try {
			await taskAPI.update(id, taskId, data);
			setEditingTask(null);
			fetchTasks();
		} catch (err) {
			setError('Failed to update task');
		}
	};

	const handleDeleteTask = async (taskId) => {
		if (window.confirm('Are you sure?')) {
			try {
				await taskAPI.delete(id, taskId);
				fetchTasks();
			} catch (err) {
				setError('Failed to delete task');
			}
		}
	};

	const handleStatusChange = (taskId, status) => {
		const task = tasks.find((t) => t._id === taskId);
		if (task) {
			handleUpdateTask(taskId, { ...task, status });
		}
	};

	if (loading) {
		return React.createElement('div', { className: 'container' }, 'Loading tasks...');
	}

	if (!project) {
		return React.createElement('div', { className: 'container' }, 'Project not found');
	}

	return React.createElement(
		'div',
		{ className: 'container', style: { paddingTop: 24, paddingBottom: 24 } },
		React.createElement(
			'div',
			{ className: 'hstack-between', style: { marginBottom: 16 } },
			React.createElement('h2', { className: 'page-title' }, project.title, ' Tasks'),
			React.createElement('button', { onClick: () => navigate('/projects'), className: 'btn-light' }, 'Back to Projects')
		),
		error && React.createElement('div', { className: 'error', style: { marginBottom: 12 } }, 'Error: ', error),
		React.createElement(
			'div',
			{ className: 'card', style: { marginBottom: 16 } },
			React.createElement('h3', { style: { marginBottom: 8 } }, 'Add Task'),
			React.createElement(
				'form',
				{ onSubmit: handleCreateTask, className: 'grid grid-4' },
				React.createElement('input', { type: 'text', placeholder: 'Task Title', value: newTask.title, onChange: (e) => setNewTask({ ...newTask, title: e.target.value }), required: true, style: { gridColumn: 'span 2' } }),
				React.createElement('input', { type: 'text', placeholder: 'Assigned To', value: newTask.assignedTo, onChange: (e) => setNewTask({ ...newTask, assignedTo: e.target.value }) }),
				React.createElement('input', { type: 'date', value: newTask.dueDate, onChange: (e) => setNewTask({ ...newTask, dueDate: e.target.value }) }),
				React.createElement('button', { type: 'submit', className: 'btn-primary', style: { gridColumn: '1 / -1' } }, 'Add Task')
			)
		),
		React.createElement(
			'div',
			{ className: 'list' },
			tasks.map((task) =>
				React.createElement(
					'div',
					{ key: task._id, className: 'card' },
					editingTask?._id === task._id
						? React.createElement(
							'div',
							{ className: 'grid grid-4', style: { alignItems: 'center' } },
							React.createElement('input', { value: editingTask.title || '', onChange: (e) => setEditingTask({ ...editingTask, title: e.target.value }), style: { gridColumn: 'span 2' } }),
							React.createElement(
								'select',
								{ value: editingTask.status || 'todo', onChange: (e) => setEditingTask({ ...editingTask, status: e.target.value }) },
								React.createElement('option', { value: 'todo' }, 'Todo'),
								React.createElement('option', { value: 'in-progress' }, 'In Progress'),
								React.createElement('option', { value: 'done' }, 'Done')
							),
							React.createElement('input', { value: editingTask.assignedTo || '', onChange: (e) => setEditingTask({ ...editingTask, assignedTo: e.target.value }) }),
							React.createElement('input', { type: 'date', value: editingTask.dueDate ? editingTask.dueDate.split('T')[0] : '', onChange: (e) => setEditingTask({ ...editingTask, dueDate: e.target.value }) }),
							React.createElement('div', { className: 'hstack', style: { gridColumn: '1 / -1' } },
								React.createElement('button', { onClick: () => handleUpdateTask(task._id, editingTask), className: 'btn-primary' }, 'Save'),
								React.createElement('button', { onClick: () => setEditingTask(null), className: 'btn-light' }, 'Cancel')
							)
						)
						: React.createElement(
							'div',
							{ className: 'grid grid-4', style: { alignItems: 'center' } },
							React.createElement('div', { style: { gridColumn: 'span 2' } },
								React.createElement('div', { style: { fontWeight: 600 } }, task.title),
								React.createElement('div', { className: 'label' }, 'Assigned: ', task.assignedTo || 'Unassigned')
							),
							React.createElement(
								'select',
								{ value: task.status, onChange: (e) => handleStatusChange(task._id, e.target.value) },
								React.createElement('option', { value: 'todo' }, 'Todo'),
								React.createElement('option', { value: 'in-progress' }, 'In Progress'),
								React.createElement('option', { value: 'done' }, 'Done')
							),
							React.createElement('div', { className: 'label' }, 'Due: ', task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'),
							React.createElement('div', { className: 'hstack' },
								React.createElement('button', { onClick: () => setEditingTask(task), className: 'btn-primary' }, 'Edit'),
								React.createElement('button', { onClick: () => handleDeleteTask(task._id), className: 'btn-danger' }, 'Delete')
							)
						)
				)
			)
		)
	);
};

export default ProjectTasks;