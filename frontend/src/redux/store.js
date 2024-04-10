// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
// import cartReducer from "./reducers/cart";

const store = configureStore({
  reducer: {
    user: userReducer,
    // cart: cartReducer,
  },
});

export default store;
