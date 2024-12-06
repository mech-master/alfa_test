import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductData = createAsyncThunk(
    "products/fetchData",
    async () => {
        const response = await axios.get("https://dummyjson.com/products")
        return response.data.products;
    }
)

const productListSlice = createSlice({
    name: "products",
    initialState: {},
    reducers: {
        getFullList: (state) => state,
        deleteProduct: (state, action) => {
            state.originProducts = state.originProducts.filter(item => item.id !== action.payload.id)
        },
        setFavorite: (state, action) => {
            state.originProducts = state.originProducts.map(
                item => item.id === action.payload.id ?
                    {...item, isFavorite: !item.isFavorite} :
                    item
            )
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductData.pending, (state) => {
                state.loadingStatus = "loading";
                state.error = null;
            })
            .addCase(fetchProductData.fulfilled, (state, action) => {
                if (Array.isArray(action.payload)) {
                    const currentList = action.payload;
                    state.originProducts = currentList.map(item => {
                        item.isFavorite = false;
                        return item;
                    })
                } else {
                    state.originProducts = [];
                };
                state.loadingStatus = "idle";
                state.error = null;
            })
            .addCase(fetchProductData.rejected, (state, action) => {
                state.products = [];
                state.loadingStatus = "failed";
                state.error = action.error.message;
            })
    }
})

export const { getFullList,deleteProduct, setFavorite } = productListSlice.actions;
export default productListSlice.reducer;