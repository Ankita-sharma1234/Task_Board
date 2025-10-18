import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api/api";

const Register = () => {
	const [formData, setFormData] = useState({ name: "", email: "", password: "" });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		try {
			const response = await authAPI.register(formData);
			login(response.data.token, response.data.user);
			navigate("/projects");
		} catch (err) {
			setError(err.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	};

	// --- Loading State ---
	if (loading) {
		return <div className="container">Loading...</div>;
	}

	// --- Register Form Component (JSX) ---
	return (
		<div
			className="container"
			style={{ display: "grid", placeItems: "center", minHeight: "100vh" }}
		>
			<div
				className="card"
				style={{ width: "100%", maxWidth: 420 }}
			>
				<h2 className="page-title" style={{ textAlign: "center" }}>
					Create your account
				</h2>

				<p className="label" style={{ textAlign: "center", marginBottom: 16 }}>
					Register to start managing projects
				</p>

				{error && (
					<div className="error" style={{ marginBottom: 12 }}>
						Error: {error}
					</div>
				)}

				<form onSubmit={handleSubmit} className="vstack">
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={formData.name}
						onChange={handleChange}
						required
					/>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={formData.email}
						onChange={handleChange}
						required
					/>
					<input
						type="password"
						name="password"
						placeholder="Password"
						value={formData.password}
						onChange={handleChange}
						required
					/>
					<button type="submit" className="btn-primary">
						Register
					</button>
				</form>

				<p className="label" style={{ textAlign: "center", marginTop: 8 }}>
					Already have an account? <Link to="/login" className="link">Login</Link>
				</p>
			</div>
		</div>
	);
};

export default Register;
