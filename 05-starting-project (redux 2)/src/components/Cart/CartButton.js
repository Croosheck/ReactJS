import classes from "./CartButton.module.css";
import { showCart } from "../../store/index";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
	const dispatch = useDispatch();
	const cartQuantity = useSelector((state) => state.product.quantity);

	const toggleCartHandler = () => {
		dispatch(showCart.toggleCart());
	};

	return (
		<button className={classes.button} onClick={toggleCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{cartQuantity}</span>
		</button>
	);
};

export default CartButton;
