import { showCart } from "./index";
import { modifyProduct } from "./index";

export const fetchCartData = () => {
	return async (dispatch) => {
		const fetchData = async () => {
			const response = await fetch(
				"https://some-cart-products-default-rtdb.firebaseio.com/cart.json"
			);

			if (!response.ok) {
				throw new Error("Could not fetch cart data");
			}

			const data = await response.json();

			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(
				modifyProduct.replaceCart({
					items: cartData.items || [],
					quantity: cartData.quantity,
				})
			);
		} catch (error) {
			dispatch(
				showCart.showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching cart data failed!",
				})
			);
		}
	};
};
