import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('addToCart', (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.cart.findIndex(i => i._id === item._id);

      if (existingItemIndex !== -1) {
        // Update the item directly using the index if it already exists
        state.cart[existingItemIndex] = item;
      } else {
        // Add the new item to the cart if it does not exist
        state.cart.push(item);
      }
    })
    .addCase('removeFromCart', (state, action) => {
      const itemId = action.payload;
      // Remove item from cart using direct mutation
      state.cart = state.cart.filter(i => i._id !== itemId);
    });
});
