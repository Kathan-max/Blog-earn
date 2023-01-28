import * as React from "react";
import "../styles/login.css";
import LoginIcon from "../assets/loginIcon.png";
import GoogleIcon from "../assets/googleIcon.png";
import userIcon from "../assets/userIcon.png";
import passwordIcon from "../assets/passwordIcon.png";
import { useState } from "react";
export default function Login1() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const performLogin = async (email: string, password: string) => {
		const http = await fetch("http://10.1.162.162:3430", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email,
				pwd: password,
			}),
		});
		const data = await http.json();
		console.log(data);
	};

	return (
		<main id="login">
			<img src={LoginIcon} alt="Login Icon" />
			<h1 id="motto">Write, Mention, Earn </h1>
			<button id="googleLogin">
				<img src={GoogleIcon} alt="Google Icon" />
				Login with Google
			</button>
			<div id="OR-block">OR</div>
			<div className="login-input-block">
				<img src={userIcon} alt="User Icon" />
				<input
					className="login-input"
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder="Enter your email"
				/>
			</div>
			<div className="login-input-block">
				<img src={passwordIcon} alt="User Icon" />

				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="login-input"
					type="password"
					placeholder="Enter your password"
				/>
			</div>
			<button
				id="login-button"
				onClick={() => {
					performLogin(email, password);
				}}
			>
				Login
			</button>
		</main>
	);
}
