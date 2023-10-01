import { configureStore, } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/filter/cartSlice";
import filterSlice from "../features/cart/filter/filterSlice";
import productsSlice from "../features/products/productsSlice";

const store = configureStore({
    reducer:{
        cart : cartSlice,
        filter: filterSlice,
        products: productsSlice,
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat()
})

export default store;