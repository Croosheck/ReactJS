import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { showCart } from "./store/index";
import Notification from "./components/UI/Notification";
import { fetchCartData } from "./store/cart-actions";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, Fragment } from "react";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const toggleCart = useSelector((state) => state.cart.isActive);
	const cart = useSelector((state) => state.product);
	const notification = useSelector((state) => state.cart.notification);

	useEffect(() => {
		dispatch(fetchCartData());
	}, [dispatch]);

	useEffect(() => {
		const sendCartData = async () => {
			dispatch(
				showCart.showNotification({
					status: "pending",
					title: "sending...",
					message: "Sending cart data",
				})
			);
			const response = await fetch(
				"https://some-cart-products-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					body: JSON.stringify({ items: cart.items, quantity: cart.quantity }),
				}
			);

			if (!response.ok) {
				throw new Error("Sending cart data failed.");
			}

			dispatch(
				showCart.showNotification({
					status: "success",
					title: "Success!",
					message: "Sent cart data successfully!",
				})
			);
		};

		if (isInitial) {
			isInitial = false;
			return;
		}

		if (cart.changed) {
			sendCartData().catch((error) => {
				dispatch(
					showCart.showNotification({
						status: "error",
						title: "Error!",
						message: "Sending cart data failed!",
					})
				);
			});
		}
	}, [cart, dispatch]);

	return (
		<Fragment>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			<Layout>
				{toggleCart && <Cart />}
				<Products />
			</Layout>
		</Fragment>
	);
}

export default App;
