import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../features/cart/filter/cartSlice";
import filterSlice from "../features/cart/filter/filterSlice";

const store = configureStore({
    reducer:{
        cart : cartSlice,
        filter: filterSlice
    },
})

export default store;