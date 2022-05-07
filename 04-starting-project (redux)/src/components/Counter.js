import classes from "./Counter.module.css";
import { counterActions } from "../store/index";
import { useSelector, useDispatch } from "react-redux";

const Counter = () => {
	const dispatch = useDispatch();
	const counter = useSelector((state) => state.counter.counter); // returns a function
	const toggle = useSelector((state) => state.counter.toggleState);

	const incrementHandler = () => {
		dispatch(counterActions.increment());
	};

	const increaseHandler = () => {
		dispatch(counterActions.increase(5));
	};

	const decrementHandler = () => {
		dispatch(counterActions.decrement());
	};

	const toggleCounterHandler = () => {
		dispatch(counterActions.toggle());
	};

	return (
		<main className={classes.counter}>
			<h1>Redux Counter</h1>
			{toggle && <div className={classes.value}>{counter}</div>}
			<div>
				<button onClick={incrementHandler}>Increment</button>
				<button onClick={increaseHandler}>+ 5</button>
				<button onClick={decrementHandler}>Decrement</button>
			</div>
			<button onClick={toggleCounterHandler}>Toggle Counter</button>
		</main>
	);
};

export default Counter;
