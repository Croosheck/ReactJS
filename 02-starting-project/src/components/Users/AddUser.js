import React, { useState, useRef } from "react";
import Card from "../UI/Card";
import classes from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {
	// const [username, setUsername] = useState("");
	// const [age, setAge] = useState("");

	const [error, setError] = useState();

	const nameInputRef = useRef();
	const ageInputRef = useRef();

	const addUserHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInputRef.current.value;
		const enteredAge = ageInputRef.current.value;

		if (!enteredName || !enteredAge || +enteredAge <= 0) {
			setError({
				title: "Invalid input",
				message: "Enter valid name and age",
			});
			return;
		}
		console.log(nameInputRef);
		console.log(enteredAge);
		props.onAddUser(enteredName, enteredAge);
		// setUsername("");
		// setAge("");
	};

	// const onChangeUsername = (event) => {
	// 	setUsername(event.target.value);
	// };

	// const onChangeAge = (event) => {
	// 	setAge(event.target.value);
	// };

	const errorHandler = () => {
		setError(null);
	};

	return (
		<div>
			{error && (
				<ErrorModal
					onClick={errorHandler}
					title={error.title}
					message={error.message}
				/>
			)}
			<Card className={classes.input}>
				<form onSubmit={addUserHandler}>
					<label htmlFor="username">Username</label>
					<input
						id="username"
						type="text"
						// value={username}
						// onChange={onChangeUsername}
						ref={nameInputRef}
					/>
					<label htmlFor="age">Age (Years)</label>
					<input
						id="age"
						type="number"
						// value={age}
						// onChange={onChangeAge}
						ref={ageInputRef}
					/>
					<Button type="submit">Add User</Button>
				</form>
			</Card>
		</div>
	);
};

export default AddUser;
