import { useState } from "react";
import Cart from "./components/Cart/Cart";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./store/CartProvider";

function App() {
	const [cartIsShown, setCartIsShown] = useState(false);

	const showModal = () => {
		setCartIsShown(true);
	};

	const hideModal = () => {
		setCartIsShown(false);
	};

	return (
		<CartProvider>
			{cartIsShown && <Cart onClick={hideModal} onBackdropClick={hideModal} />}
			<Header onClick={showModal} />
			<main>
				<Meals />
			</main>
		</CartProvider>
	);
}

export default App;
