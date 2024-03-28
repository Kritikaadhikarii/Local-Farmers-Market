import { createReducer } from "@reduxjs/toolkit";

//redux stores the state of the project
const initialState = {
  isAuthenticated: false, //initial value false
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  // in case of any error
  clearErrors: (state) => {
    state.error = null;
  },
});
