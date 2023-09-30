import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProducts } from "./productsApi";

const initialState = {
    products : [],
    isloading  :false,
    isError  :false,
    error : ""
}
export const getProducts = createAsyncThunk("products/getProducts", async() => {
    const products = fetchProducts()
    return products;

})
const productsSlice = createSlice({
    name: "products",
    initialState,
    extraReducers :(builder)=>{
    builder
    .addCase(getProducts.pending,(state,action)=>{
    state.isloading = true;
    state.isError = false;
})
.addCase(getProducts.fulfilled,(state,action)=>{
    state.products=action.payload;
    state.isloading = false
})
.addCase(getProducts.rejected,(state,action)=>{
    state.products=[];
    state.isloading = false;
    state.isError = true;
    state.error= action.error.message;
})
},
})

export default productsSlice.reducer;