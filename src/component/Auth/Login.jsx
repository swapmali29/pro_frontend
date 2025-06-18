import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import useUserDetails from './AuthService';

export const Login = () => {
	// const [emails, setEmails] = useState([]);          // Email list from JSON
	// const [passwords, setPasswords] = useState([]);     // password list from JSON
	const { emails, passwords, users } = useUserDetails();
	const [inputEmail, setInputEmail] = useState('');  // User input
	const [inputPassword, setInputPassword] = useState('');  // User password
	const [message, setMessage] = useState('');         // Result message
	const navigate = useNavigate();

	// Step 1: Fetch email list from JSON API on mount from authservices


	// Step 2: Login logic using `if` condition
	const handleLogin = (e) => {
		e.preventDefault();
		const normalizedEmail = inputEmail.trim().toLowerCase();
		const normalizedPassword = inputPassword;

		// if (emails.includes(normalizedEmail) && passwords.includes(normalizedPassword)) {
		// 	setMessage('✅ Login Successful!');
		// 	localStorage.setItem('isLoggedIn', 'true');
		// 	navigate('/');
		// } else {
		// 	setMessage('❌ Login Failed: Email not found.');
		// }

		const matchedUser = users.find(
			user =>
				user.email.toLowerCase() === normalizedEmail &&
				user.password === normalizedPassword
		);

		if ((normalizedEmail != "" && normalizedPassword != "")) {
			if (matchedUser) {
				setMessage('✅ Login Successful!');
				localStorage.setItem('isLoggedIn', 'true');
				localStorage.setItem('user', JSON.stringify(matchedUser)); // ✅ store username & role
				navigate('/');
			} else {
				setMessage('❌ Login Failed: Not valid credentials entered.');
			}

		} else {
			setMessage('❌ Login Failed: Not valid credentials entered.');
		}

	};



	return (
		<div style={{ display: 'flex', height: '95vh', alignItems: 'center', justifyContent: 'center' }}>
			<div className="login-container" id="container">

				<div className="form-container sign-in-container">
					<form onSubmit={handleLogin}>
						<h1 style={{ fontSize: '32px', marginBottom: '18px' }}>Product Management</h1>
						<input type="email" placeholder="Email" name='email' value={inputEmail} onChange={(e) => setInputEmail(e.target.value)} />
						<input type="password" placeholder="Password" name='password' value={inputPassword} onChange={(e) => setInputPassword(e.target.value)} />

						<button type='submit'>Sign In</button>
						{message && <p>{message}</p>}
					</form>
				</div>
				<div className="overlay-container">
					<div className="overlay">

						<div className="overlay-panel overlay-right">
							<h1>Hello, Friend!</h1>
							<p>Enter your personal details and start journey with us</p>
							<Link to={`/sign-up`}>
								<button className="ghost" id="signUp">Sign Up</button>
							</Link>
						</div>
					</div>
				</div>
			</div>

		</div>
	)
}

