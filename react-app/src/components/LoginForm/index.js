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

						<div>Welcome back!</div>

						<div className="non-title-text">We're so excited to see you again</div>

					</div>

					<form
						className="actual-form login"
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

						<button type="submit" className="button login">Log In</button>

						<div>
							Need an account? <Link className="link" to="/register">Register</Link>
						</div>

					</form>

				</div>

				<div className="potential-qr-code-div">

					<img src="https://i.imgur.com/imhS9WK.png" className="qr-code-actual" />

					<h2>
						Repo link
					</h2>

				</div>
			</div>
		</div>
	);
}
