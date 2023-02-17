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
		<div className="page-wrapper login">

			<div className="img-div">
				<img src="https://i.imgur.com/nBUx5Al.png" className="temp-img-class" />
			</div>

			<div className="master-div login">

				<div className="main-form login">

					<div className="title-div login">

						<div className="welcome-back">Welcome back!</div>

						<div className="non-title-text">We're so excited to see you again!</div>

					</div>

					<form
						className="actual-form login"
						onSubmit={handleSubmit}
					>

						{/* <ul>
							{errors.map((error, idx) => (
								<li key={idx}>{error}</li>
							))}
						</ul> */}

						<label
							className={`form-labels ${!!errors.length}`}
						>
							Email
							<div className="dot">.</div>
							<div className="errors-actual">{!!errors.length ? '- Login or password is invalid' : ''}</div>
						</label>

						<input
							type="email"
							value={email}
							onChange={e => setEmail(e.target.value)}
							required
						/>

						<label className={`form-labels ${!!errors.length}`}>
							Password
							<div className="dot errors-actual">-</div>
							<div className="errors-actual">
								{!!errors.length ? '- Login or password is invalid' : ''}</div>
						</label>

						<input
							type="password"
							value={password}
							onChange={e => setPassword(e.target.value)}
							required
						/>

						<button type="submit" className="login-signup-button login">Log In</button>

						<div className="signup-redirect-text">
							Need an account? <Link className="signup-redirect-text link" to="/register">Register</Link>
						</div>

					</form>

				</div>

				<div className="potential-qr-code-div">

					<img src="https://i.imgur.com/imhS9WK.png" className="qr-code-actual" />

					<h2>
						Repo link
					</h2>
					<div>
						or click <a
							className="signup-redirect-text link"
							href="https://github.com/hen-wood/group-4-flask-project.git">here</a>
					</div>

				</div>
			</div>
		</div>
	);
}
