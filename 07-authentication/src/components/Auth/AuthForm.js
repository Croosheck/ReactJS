import { useState, useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
	const history = useHistory();
	const [isLogin, setIsLogin] = useState(true);
	const [isLoading, setIsLoading] = useState(false);

	const authCtx = useContext(AuthContext);

	const emailInputRef = useRef();
	const passwordInputRef = useRef();

	const switchAuthModeHandler = () => {
		setIsLogin((prevState) => !prevState);
	};

	const submitHandler = (event) => {
		event.preventDefault();

		let enteredEmail = emailInputRef.current.value;
		let eneteredPassword = passwordInputRef.current.value;

		// optional: Add validation

		setIsLoading(true);
		let url;

		if (isLogin) {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDOFmuibYVitUo0fyzOm24I32SlqUm7NOc";
		} else {
			url =
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOFmuibYVitUo0fyzOm24I32SlqUm7NOc";
		}

		fetch(url, {
			method: "POST",
			body: JSON.stringify({
				email: enteredEmail,
				password: eneteredPassword,
				returnSecureToken: true,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				setIsLoading(false);
				if (res.ok) {
					emailInputRef.current.value = "";
					passwordInputRef.current.value = "";

					return res.json();
				} else {
					passwordInputRef.current.value = "";
					passwordInputRef.current.focus();

					return res.json().then((data) => {
						// show an error modal
						// console.log(data.error.message);
						let errorMessage = "Authentication failed!";
						if (data && data.error && data.error.message) {
							errorMessage = data.error.message;
						}
						throw new Error(errorMessage);
					});
				}
			})
			.then((data) => {
				const expirationTime = new Date(new Date().getTime() + 3 * 60 * 1000);

				authCtx.login(data.idToken, expirationTime.toISOString());
				history.replace("/");
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	return (
		<section className={classes.auth}>
			<h1>{isLogin ? "Login" : "Sign Up"}</h1>
			<form onSubmit={submitHandler}>
				<div className={classes.control}>
					<label htmlFor="email">Your Email</label>
					<input type="email" id="email" required ref={emailInputRef} />
				</div>
				<div className={classes.control}>
					<label htmlFor="password">Your Password</label>
					<input
						type="password"
						id="password"
						required
						ref={passwordInputRef}
					/>
				</div>
				<div className={classes.actions}>
					{!isLoading && (
						<button>{isLogin ? "Login" : "Create Account"}</button>
					)}
					{isLoading && <p style={{ color: "white" }}>Sending request...</p>}
					<button
						type="button"
						className={classes.toggle}
						onClick={switchAuthModeHandler}
					>
						{isLogin ? "Create new account" : "Login with existing account"}
					</button>
				</div>
			</form>
		</section>
	);
};

export default AuthForm;
