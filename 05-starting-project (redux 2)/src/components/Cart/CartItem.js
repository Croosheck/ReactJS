import classes from "./CartItem.module.css";
import { modifyProduct } from "../../store/index";
import { useDispatch } from "react-redux";

const CartItem = (props) => {
	const dispatch = useDispatch();
	const { title, quantity = 0, price = 0, id } = props.item;

	const increaseHandler = () => {
		dispatch(
			modifyProduct.addItem({
				id,
				title,
				price,
			})
		);
	};

	const decreaseHandler = () => {
		dispatch(modifyProduct.removeItem(id));
	};

	return (
		<li className={classes.item}>
			<header>
				<h3>{title}</h3>
				<div className={classes.price}>
					${(quantity * price).toFixed(2)}{" "}
					<span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
				</div>
			</header>
			<div className={classes.details}>
				<div className={classes.quantity}>
					x <span>{quantity}</span>
				</div>
				<div className={classes.actions}>
					<button onClick={decreaseHandler}>-</button>
					<button onClick={increaseHandler}>+</button>
				</div>
			</div>
		</li>
	);
};

export default CartItem;
