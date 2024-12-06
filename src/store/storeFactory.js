import { configureStore } from "@reduxjs/toolkit";

import productListReducer from "./slices/productListSlice"

const storeFactory = (isServer = false, initialState = {}) => {
    const store = configureStore({
        reducer: {
            products: productListReducer
        },
        preloadedState: initialState,
        devTools: process.env.NODE_ENV !== "production"
    })

    if (process.env.NODE_ENV !== "production") store.subscribe(() => {
        console.log(store.getState());
    })

    return store;
}

export default storeFactory;