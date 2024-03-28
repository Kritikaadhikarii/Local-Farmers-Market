import {ConfigureStore, configureStore} from "@reduxjs/toolkit";
import {userReducer} from "./reducers/users";

const Store = configureStore({
    reducer:{
        user: userReducer,

    }
});

export default Store;