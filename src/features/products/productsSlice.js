import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteProduct, fetchProducts, postProduct } from "./productsApi";

const initialState = {
    products : [],
    isloading  :false,
    postSuccess: false,
    deleteSuccess : false,
    isError  :false,
    error : ""
}
export const getProducts = createAsyncThunk("products/getProducts", async() => {
    const products =await fetchProducts();
    return products;
})
export const addProducts = createAsyncThunk("products/addProducts", async(data) => {
    const products = await postProduct(data);
    return products;
})

export const removeProducts = createAsyncThunk("products/removeProducts", async(id,thunkApi) => {
    const products = await deleteProduct(id);
    thunkApi.dispatch(removefromList(id))
    return products;
})


const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        togglePostSuccess: (state)=>{
             state.postSuccess=false
        },
        toggleDeleteSuccess: (state)=>{
             state.deleteSuccess=false
        },
         removefromList : (state,action)=>{
            state.products=state.products.filter(product=>product._id!==action.payload)
        },
},
    extraReducers :(builder)=>{
    builder
    .addCase(getProducts.pending,(state)=>{
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
    .addCase(addProducts.pending,(state)=>{
        state.isloading = true;
        state.postSuccess = false;
        state.isError = false;
})
    .addCase(addProducts.fulfilled,(state)=>{
        state.postSuccess=true;
        state.isloading = false;
})
    .addCase(addProducts.rejected,(state,action)=>{
        state.products=[];
        state.isloading = false;
        state.postSuccess = false;
        state.isError = true;
        state.error= action.error.message;
})
.addCase(removeProducts.pending,(state)=>{
    state.isloading = true;
    state.deleteSuccess = false;
    state.isError = false;
})
.addCase(removeProducts.fulfilled,(state)=>{
    state.deleteSuccess=true;
    state.isloading = false;
})
.addCase(removeProducts.rejected,(state,action)=>{
    state.products=[];
    state.isloading = false;
    state.postSuccess = false;
    state.deleteSuccess = false;
    state.isError = true;
    state.error= action.error.message;
})
},
})

export const {togglePostSuccess,toggleDeleteSuccess,removefromList}=productsSlice.actions;
export default productsSlice.reducer;