import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
    reducerPath : "productApi",
    baseQuery : fetchBaseQuery({
        baseUrl : "http://localhost:5000"
    }),
    tagTypes : ["products"],
    endpoints : (builder)=>({
        getProducts : builder.query({
            query : ()=> ({
                url: "/products"
            }),
            providesTags : ["products"]
        }),
        addProducts : builder.mutation({
            query : (data)=>({
                url : "/products",
                method : "POST",
                body : data,
            })
        }),
        removeProducts : builder.mutation({
            query : (id)=>({
                url : `/products/${id}`,
                method : "DELETE",
            }),
            invalidatesTags:["products"]
        }),
    })
})
export const {useGetProductsQuery,useAddProductsMutation,useRemoveProductsMutation}=productApi;
