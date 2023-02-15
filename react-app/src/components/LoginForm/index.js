import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import './LoginForm.css';

export default function LoginForm() {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/channels/@me" />;

	const handleSubmit = async e => {
		e.preventDefault();
		const data = await dispatch(login(email, password));
		if (data) {
			setErrors(data);
		}
	};

	return (
		<>
			{/* <img src="https://i.imgur.com/nBUx5Al.png" className="temp-img-class" /> */}

			<div className="login-form-div">
				<div className="login-form-info">

					<h1>Log In</h1>
					<form
						className="login-form-actual"
						onSubmit={handleSubmit}
					>
						<ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul>
						<label>
							Email
						</label>
						<input
							type="text"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<label>
							Password
						</label>
						<input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>
						<button type="submit">Log In</button>
						Need an account? <Link to="/register">Register</Link>
					</form>
				</div>
				<div className="potential-qr-code">
					SQUARE
				</div>
			</div>
		</>
	);
}
