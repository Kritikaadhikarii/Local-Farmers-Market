import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    .addCase('addToWishlist', (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.wishlist.findIndex(i => i._id === item._id);

      if (existingItemIndex !== -1) {
        // Item exists, update it directly
        state.wishlist[existingItemIndex] = item;
      } else {
        // Item does not exist, add new item to the wishlist
        state.wishlist.push(item);
      }
    })
    .addCase('removeFromWishlist', (state, action) => {
      const itemId = action.payload;
      // Remove item from wishlist using direct mutation
      state.wishlist = state.wishlist.filter(i => i._id !== itemId);
    });
});
