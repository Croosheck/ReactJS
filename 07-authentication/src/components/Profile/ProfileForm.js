import { useRef, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";

import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
	const history = useHistory();
	const newPasswordInputRef = useRef();
	const authCtx = useContext(AuthContext);

	const submitHandler = (event) => {
		event.preventDefault();

		const enteredNewPassword = newPasswordInputRef.current.value;

		// add validation (optional)

		fetch(
			"https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDOFmuibYVitUo0fyzOm24I32SlqUm7NOc",
			{
				method: "POST",
				body: JSON.stringify({
					idToken: authCtx.token,
					password: authCtx.password,
					returnSecureToken: false,
				}),
				headers: {
					"Content-Type": "application-json",
				},
			}
		).then((res) => {
			// assumption: Always succeeds!

			history.replace("/");
		});
	};

	return (
		<form className={classes.form} onSubmit={submitHandler}>
			<div className={classes.control}>
				<label htmlFor="new-password">New Password</label>
				<input
					type="password"
					id="new-password"
					minLength="6"
					ref={newPasswordInputRef}
				/>
			</div>
			<div className={classes.action}>
				<button>Change Password</button>
			</div>
		</form>
	);
};

export default ProfileForm;
