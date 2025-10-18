import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { projectAPI } from '../api/api';

const Projects = () => {
	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');
	const [showForm, setShowForm] = useState(false);
	const [newProject, setNewProject] = useState({ title: '', description: '' });
	const { logout, user } = useAuth();

	useEffect(() => {
		fetchProjects();
	}, []);

	const fetchProjects = async () => {
		try {
			const response = await projectAPI.getAll();
			setProjects(response.data);
		} catch (err) {
			setError(err.response?.data?.message || 'Failed to fetch projects');
		} finally {
			setLoading(false);
		}
	};

	const handleCreateProject = async (e) => {
		e.preventDefault();
		try {
			await projectAPI.create(newProject);
			setShowForm(false);
			setNewProject({ title: '', description: '' });
			fetchProjects();
		} catch (err) {
			setError('Failed to create project');
		}
	};

	const handleDelete = async (id) => {
		if (window.confirm('Are you sure?')) {
			try {
				await projectAPI.delete(id);
				fetchProjects();
			} catch (err) {
				setError('Failed to delete project');
			}
		}
	};

	if (loading) {
		return React.createElement('div', { className: 'container' }, 'Loading projects...');
	}

	return React.createElement(
		'div',
		{ className: 'container', style: { paddingTop: 24, paddingBottom: 24 } },
		React.createElement(
			'div',
			{ className: 'hstack-between', style: { marginBottom: 16 } },
			React.createElement('h2', { className: 'page-title' }, 'Projects'),
			React.createElement(
				'div',
				{ className: 'hstack' },
				React.createElement('button', { onClick: () => setShowForm(true), className: 'btn-primary' }, 'New Project'),
				React.createElement('button', { onClick: logout, className: 'btn-light' }, 'Logout')
			)
		),
		error && React.createElement('div', { className: 'error', style: { marginBottom: 12 } }, 'Error: ', error),
		showForm && React.createElement(
			'div',
			{ className: 'card', style: { marginBottom: 16 } },
			React.createElement('h3', { style: { marginBottom: 8 } }, 'Create Project'),
			React.createElement(
				'form',
				{ onSubmit: handleCreateProject, className: 'grid grid-2' },
				React.createElement('input', { type: 'text', placeholder: 'Title', value: newProject.title, onChange: (e) => setNewProject({ ...newProject, title: e.target.value }), required: true }),
				React.createElement('input', { type: 'text', placeholder: 'Description', value: newProject.description, onChange: (e) => setNewProject({ ...newProject, description: e.target.value }), required: true, style: { gridColumn: '1 / -1' } }),
				React.createElement('button', { type: 'submit', className: 'btn-primary' }, 'Create'),
				React.createElement('button', { type: 'button', onClick: () => setShowForm(false), className: 'btn-light' }, 'Cancel')
			)
		),
		projects.length === 0 && !showForm ? React.createElement(
			'div',
			{ className: 'card', style: { textAlign: 'center', padding: '48px 24px' } },
			React.createElement('h3', { style: { marginBottom: 8, color: 'var(--primary)' } }, `Welcome ${user?.name || 'User'}!`),
			React.createElement('p', { className: 'label', style: { marginBottom: 16 } }, 'You don\'t have any projects yet. Create your first project to get started.'),
			React.createElement('button', { onClick: () => setShowForm(true), className: 'btn-primary' }, 'Create Your First Project')
		) : React.createElement(
			'div',
			{ className: 'grid grid-2' },
			projects.map((project) =>
				React.createElement(
					'div',
					{ key: project._id, className: 'card vstack' },
					React.createElement('div', { className: 'hstack-between' },
						React.createElement('div', null,
							React.createElement('h4', { style: { margin: 0 } }, project.title),
							React.createElement('p', { className: 'label' }, project.description)
						),
						React.createElement('button', { onClick: () => handleDelete(project._id), className: 'btn-danger' }, 'Delete')
					),
					React.createElement(Link, { to: `/projects/${project._id}`, className: 'link' }, 'Open Task Board')
				)
			)
		)
	);
};

export default Projects;