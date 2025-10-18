import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { authAPI } from '../api/api';

const Login = () => {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			const response = await authAPI.login(formData);
			login(response.data.token, response.data.user);
			navigate('/projects');
		} catch (err) {
			setError(err.response?.data?.message || 'Login failed');
		} finally {
			setLoading(false);
		}
	};

	if (loading) {
		return React.createElement('div', { className: 'container' }, 'Loading...');
	}

	return React.createElement(
		'div',
		{ className: 'container', style: { display: 'grid', placeItems: 'center', minHeight: '100vh' } },
		React.createElement(
			'div',
			{ className: 'card', style: { width: '100%', maxWidth: 420 } },
			React.createElement('h2', { className: 'page-title', style: { textAlign: 'center' } }, 'Welcome back'),
			React.createElement('p', { className: 'label', style: { textAlign: 'center', marginBottom: 16 } }, 'Login to continue to your projects'),
			error && React.createElement('div', { className: 'error', style: { marginBottom: 12 } }, 'Error: ', error),
			React.createElement(
				'form',
				{ onSubmit: handleSubmit, className: 'vstack' },
				React.createElement('input', {
					type: 'email',
					name: 'email',
					placeholder: 'Email',
					value: formData.email,
					onChange: handleChange,
					required: true
				}),
				React.createElement('input', {
					type: 'password',
					name: 'password',
					placeholder: 'Password',
					value: formData.password,
					onChange: handleChange,
					required: true
				}),
				React.createElement('button', { type: 'submit', className: 'btn-primary' }, 'Login')
			),
			React.createElement(
				'p',
				{ className: 'label', style: { textAlign: 'center', marginTop: 8 } },
				"Don't have an account? ",
				React.createElement(Link, { to: '/register', className: 'link' }, 'Register')
			)
		)
	);
};

export default Login;

