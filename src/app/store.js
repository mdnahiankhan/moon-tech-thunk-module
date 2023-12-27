import { configureStore, } from "@reduxjs/toolkit";
import { productApi } from "../features/api/apiSlice";
import cartSlice from "../features/cart/filter/cartSlice";
import filterSlice from "../features/cart/filter/filterSlice";

const store = configureStore({
    reducer:{
        [productApi.reducerPath] : productApi.reducer,
        cart : cartSlice,
        filter: filterSlice,
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(productApi.middleware)
})

export default store;