import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormFeedback,
	Card,
	CardBody,
	CardTitle,
} from 'reactstrap';

export const Register = () => {

	const [formData, setFormData] = useState({ email: '', password: '', role: '', username: '' });
	const [errors, setErrors] = useState({});
	const navigate = useNavigate();

	const validate = () => {
		const newErrors = {};
		if (!formData.username) newErrors.username = 'Username is required';
		if (!formData.email) newErrors.email = 'Email is required';
		else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
		if (!formData.password) newErrors.password = 'Password is required';
		if (!formData.role) newErrors.role = 'Role is required';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const handleSubmit = e => {
		e.preventDefault();
		if (validate()) {
			axios.post('https://pro-backend-ahba.onrender.com/details', formData).then(() => {
				toast.success('Employee added successfully!');
				navigate('/login');
			});
		}

	};


	return (
		<div style={{ display: 'flex', height: '95vh', alignItems: 'center', justifyContent: 'center' }}>
			<div className="login-container" id="container">
				<div className="form-container sign-up-container">
					<form onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<span>or use your email for registration</span>
						<input type="text" placeholder="Username" name='username' value={formData.username} onChange={handleChange} />
						{errors.username && (<p style={{ margin: "0", color: "red" }}>{errors.username}</p>)}

						<input type="email" placeholder="Email" name='email' value={formData.email} onChange={handleChange} />
						{errors.email && (<p style={{ margin: "0", color: "red" }}>{errors.email}</p>)}

						<input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
						{errors.password && (<p style={{ margin: "0", color: "red" }}>{errors.password}</p>)}

						<select name="role" onChange={handleChange} value={formData.role}>
							<option value="">Select Role</option>
							<option value="admin">Admin</option>
							<option value="user">User</option>
						</select>
						{errors.role && (<p style={{ margin: "0", color: "red" }}>{errors.role}</p>)}
						{/* <input type="text" placeholder="Role (Admin/User)" name='role' value={formData.role} onChange={handleChange} /> */}
						<button type='submit'>Sign Up</button>
					</form>
				</div>

				<div className="overlay-container">
					<div className="overlay">

						<div className="overlay-panel overlay-right">
							<h1>Welcome Back!</h1>
							<p>To keep connected with us please login with your personal info</p>
							<Link to={`/login`}>
								<button className="ghost" id="signIn">Sign In</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}
