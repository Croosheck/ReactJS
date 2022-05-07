import { createSlice, configureStore } from "@reduxjs/toolkit";

const cartSlice = createSlice({
	name: "cart",
	initialState: { isActive: false, notification: null },
	reducers: {
		toggleCart(state) {
			state.isActive = !state.isActive;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

const productSlice = createSlice({
	name: "product",
	initialState: {
		items: [],
		quantity: 0,
		totalPrice: 0,
		changed: false,
	},
	reducers: {
		replaceCart(state, action) {
			state.quantity = action.payload.quantity;
			state.items = action.payload.items;
		},

		addItem(state, action) {
			const newItem = action.payload;
			const existingItem = state.items.find((item) => item.id === newItem.id);
			state.quantity++;
			state.changed = true;
			if (!existingItem) {
				state.items.push({
					id: newItem.id,
					price: newItem.price,
					quantity: 1,
					totalPrice: newItem.price,
					name: newItem.title,
				});
			} else {
				existingItem.quantity++;
				existingItem.totalPrice = existingItem.totalPrice + newItem.price;
			}
		},

		removeItem(state, action) {
			const id = action.payload;
			const existingItem = state.items.find((item) => item.id === id);
			state.quantity--;
			state.changed = true;
			if (existingItem.quantity === 1) {
				state.items = state.items.filter((item) => item.id !== id);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
			}
		},
	},
});

const store = configureStore({
	reducer: { cart: cartSlice.reducer, product: productSlice.reducer },
});

export const showCart = cartSlice.actions;
export const modifyProduct = productSlice.actions;
export default store;
