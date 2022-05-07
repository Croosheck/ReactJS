// import { createStore } from "redux";
import { createSlice, configureStore } from "@reduxjs/toolkit";

const counterSlice = createSlice({
	name: "counter",
	initialState: { counter: 0, toggleState: true },
	reducers: {
		increment(state) {
			state.counter++;
		},
		decrement(state) {
			state.counter--;
		},
		increase(state, action) {
			state.counter = state.counter + action.payload;
		},
		toggle(state) {
			state.toggleState = !state.toggleState;
		},
	},
});

const authSlice = createSlice({
	name: "auth",
	initialState: { isAuthenticated: false },
	reducers: {
		login(state) {
			state.isAuthenticated = true;
		},
		logout(state) {
			state.isAuthenticated = false;
		},
	},
});

// const counterReducer = (state = { counter: 0, toggleState: true }, action) => {
// 	if (action.type === "increment") {
// 		return {
// 			counter: state.counter + 1,
// 			toggleState: state.toggleState,
// 		};
// 	}

// 	if (action.type === "increase") {
// 		return {
// 			counter: state.counter + action.amount,
// 			toggleState: state.toggleState,
// 		};
// 	}

// 	if (action.type === "decrement") {
// 		return {
// 			counter: state.counter - 1,
// 			toggleState: state.toggleState,
// 		};
// 	}

// 	if (action.type === "toggle") {
// 		return {
// 			counter: state.counter,
// 			toggleState: !state.toggleState,
// 		};
// 	}
// 	return state;
// };

const store = configureStore({
	reducer: { counter: counterSlice.reducer, auth: authSlice.reducer },
});

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
