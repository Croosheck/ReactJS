import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
	token: "",
	isLoggedIn: false,
	login: (token) => {},
	logout: () => {},
	timeout: null,
});

const calculateRrmainingTime = (expirationTime) => {
	const currentTime = new Date().getTime();
	const adjExpirationTime = new Date(expirationTime).getTime();

	const remainingDuration = adjExpirationTime - currentTime;

	return remainingDuration;
};

const retrieveStoredToken = () => {
	const storedToken = localStorage.getItem("token");
	const storedExpirationDate = localStorage.getItem("expirationTime");

	const remainingTime = calculateRrmainingTime(storedExpirationDate);

	if (remainingTime <= 3000) {
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");
		return null;
	}

	return {
		token: storedToken,
		duration: remainingTime,
	};
};

export const AuthContextProvider = (props) => {
	const tokenData = retrieveStoredToken();
	let initialToken;

	if (tokenData) {
		initialToken = tokenData.token;
	}

	const [token, setToken] = useState(initialToken);

	const userIsLoggedIn = !!token;

	const logoutHandler = useCallback(() => {
		setToken(null);
		localStorage.removeItem("token");
		localStorage.removeItem("expirationTime");

		if (logoutTimer) {
			clearTimeout(logoutTimer);
		}
	}, []);

	const loginHandler = (token, expirationTime) => {
		setToken(token);
		localStorage.setItem("token", token);
		localStorage.setItem("expirationTime", expirationTime);

		// Used to set the timeout correlated with Firebase (1h by default)
		// const remainingTime = calculateRrmainingTime(expirationTime);

		logoutTimer = setTimeout(logoutHandler, 3 * 60 * 1000);
	};

	useEffect(() => {
		if (tokenData) {
			logoutTimer = setTimeout(logoutHandler, tokenData.duration);
		}
	}, [tokenData, logoutHandler]);

	const contextValue = {
		token: token,
		isLoggedIn: userIsLoggedIn,
		login: loginHandler,
		logout: logoutHandler,
	};

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
