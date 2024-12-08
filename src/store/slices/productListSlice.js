import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {v4} from "uuid";

export const fetchProductData = createAsyncThunk(
    "products/fetchData",
    async () => {
        const response = await axios.get("https://dummyjson.com/products")
        return response.data.products;
    }
)

const productListSlice = createSlice({
    name: "products",
    initialState: {
        originProducts: [],
        filter: "none"
    },
    reducers: {
        deleteProduct: (state, action) => {
            state.originProducts = state.originProducts.filter(item => item.id !== action.payload.id)
        },
        setFavorite: (state, action) => {
            state.originProducts = state.originProducts.map(
                item => item.id === action.payload.id ?
                    {...item, isFavorite: !item.isFavorite} :
                    item
            )
        },
        setFilter: (state, action) => {
            state.filter = action.payload.filter
        },
        addNewProduct: (state, action) => {
            state.originProducts = [
                ... state.originProducts,
                {
                    id: v4(),
                    title: action.payload.title,
                    images: [action.payload.picture],
                    description: action.payload.description,
                    price: action.payload.price,
                    stock: action.payload.stock
                }
            ]
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
                state.originProducts = [];
                state.loadingStatus = "failed";
                state.error = action.error.message;
            })
    }
})

export const { deleteProduct, setFavorite, setFilter, addNewProduct } = productListSlice.actions;
export default productListSlice.reducer;