import * as React from "react";
import "../styles/login.css";
import LoginIcon from "../assets/loginIcon.png";
import GoogleIcon from "../assets/googleIcon.png";

export default function Login1() {
	return (
		<main id="login">
			<img src={LoginIcon} alt="Login Icon" />
			<h1 id="motto">Write,Mention,Earn </h1>
			<button id="googleLogin">
				<img src={GoogleIcon} alt="Google Icon" />
				Login with Google
			</button>
			<div id="OR-block">OR</div>
			<div class="login-input-block">
				<input
					class="login-input"
					type="text"
					placeholder="Enter your email"
				/>
			</div>
			<div class="login-input-block">
				<input
					class="login-input"
					type="password"
					placeholder="Enter your password"
				/>
			</div>
		</main>
	);
}
