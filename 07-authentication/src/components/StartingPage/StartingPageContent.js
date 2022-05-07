import classes from "./StartingPageContent.module.css";
import { useContext, useState, useEffect } from "react";
import AuthContext from "../../store/auth-context";

const StartingPageContent = () => {
	const authCtx = useContext(AuthContext);

	// Takes the declared time in AuthForm (3 minutes) in miliseconds
	const time =
		new Date(localStorage.getItem("expirationTime")).getTime() -
		new Date(new Date().getTime());

	const [timer, setTimer] = useState(time);

	// Formates to minutes and seconds
	const timeout = `${Math.floor(time / 1000 / 60)} minute(s) and ${Math.floor(
		(time / 1000) % 60
	)} second(s) left`;

	useEffect(() => {
		const updateTimer = () => {
			setTimer(timer - 1000);
		};
		const timeout = setTimeout(updateTimer, 1000);

		return () => {
			clearTimeout(timeout);
		};
	}, [timer]);

	return (
		<section className={classes.starting}>
			{!authCtx.isLoggedIn ? (
				<h2>You're not logged in!</h2>
			) : (
				<>
					<h1>You're logged in!</h1>
					<p>You will be logged out automatically after 3 minutes.</p>
					<p>{timeout}</p>
				</>
			)}
		</section>
	);
};

export default StartingPageContent;
