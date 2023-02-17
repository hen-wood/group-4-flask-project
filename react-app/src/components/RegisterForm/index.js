import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signUp } from "../../store/session";
// import './SignupForm.css';

export default function RegisterForm() {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return <Redirect to="/channels/@me" />;

	const handleSubmit = async e => {
		e.preventDefault();

		const checked = []

		if (username.length < 2 || username.length > 32) {
			checked.push('Must be between 2 and 32 in length')
		}

		if (password.length < 8) {
			checked.push('Must be at least 8 characters long')
		}
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			}
		} else {
			checked.push("Confirm Password field must be the same as the Password field")
		}

		setErrors(checked)
	};

	return (
		<div className="page-wrapper sign-up">

			<div className="img-div">
				<img src="https://i.imgur.com/nBUx5Al.png" className="temp-img-class" />
			</div>

			<div className="master-div sign-up">

				<div>

					<h1>Sign Up</h1>
					<form
						onSubmit={handleSubmit}
						className="actual-form sign-up"
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
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>
						<label>
							Username
						</label>
						<input
							type="text"
							value={username}
							onChange={e => setUsername(e.target.value)}
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
						<label>
							Confirm Password
						</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							required
						/>
						<button type="submit" className="login-signup-button">Sign Up</button>
					</form>
					<Link className="signup-redirect-text link" to="/login">Already have an account?</Link>
				</div>
			</div>
		</div>
	);
}
