import { createReducer, createAction } from "@reduxjs/toolkit";

// Define action types as constants
const ADD_TO_CART = "cart/addToCart";
const REMOVE_FROM_CART = "cart/removeFromCart";

// Create actions
export const addToCart = createAction(ADD_TO_CART);
export const removeFromCart = createAction(REMOVE_FROM_CART);

// Define initial state
const initialState = {
  cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
};

// Create reducer
export const cartReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addToCart, (state, action) => {
      const item = action.payload;
      const isItemExist = state.cart.find((i) => i._id === item._id);
      if (isItemExist) {
        state.cart = state.cart.map((i) => (i._id === isItemExist._id ? item : i));
      } else {
        state.cart = [...state.cart, item];
      }
    })
    .addCase(removeFromCart, (state, action) => {
      state.cart = state.cart.filter((i) => i._id !== action.payload);
    });
});



















// import { createReducer } from "@reduxjs/toolkit";

// // Define action types as constants
// const ADD_TO_CART = 'cart/addToCart';
// const REMOVE_FROM_CART = 'cart/removeFromCart';

// const initialState = {
//   cart: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
// };

// export const cartReducer = createReducer(initialState, {
//   [ADD_TO_CART]: (state, action) => {
//     const item = action.payload;
//     const isItemExist = state.cart.find((i) => i._id === item._id);
//     if (isItemExist) {
//       return {
//         ...state,
//         cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
//       };
//     } else {
//       return {
//         ...state,
//         cart: [...state.cart, item],
//       };
//     }
//   },

//   [REMOVE_FROM_CART]: (state, action) => {
//     return {
//       ...state,
//       cart: state.cart.filter((i) => i._id !== action.payload),
//     };
//   },
// });



// // import { createReducer } from "@reduxjs/toolkit";

// // const initialState = {
// //   cart: localStorage.getItem("cartItems")

// //     ? JSON.parse(localStorage.getItem("cartItems"))
// //     : [],
// // };

// // export const cartReducer = createReducer(initialState, {
// //   addToCart: (state, action) => {
// //     const item = action.payload;
// //     const isItemExist = state.cart.find((i) => i._id === item._id);
// //     if (isItemExist) {
// //       return {
// //         ...state,
// //         cart: state.cart.map((i) => (i._id === isItemExist._id ? item : i)),
// //       };
// //     } else {
// //       return {
// //         ...state,
// //         cart: [...state.cart, item],
// //       };
// //     }
// //   },

  
// //   removeFromCart: (state, action) => {
// //     return {
// //       ...state,
// //       cart: state.cart.filter((i) => i._id !== action.payload),
// //     };
// //   },
// // });