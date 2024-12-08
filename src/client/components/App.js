import React, { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router";

import { fetchProductData } from "../../store/slices/productListSlice";
import PageLayer from "./page_layer";
import {
    About,
    ErrorPage,
    ProductList,
    CardDetail,
    NewProduct
} from "./pages";

const App = () => {
    const dispatch = useDispatch();
    let loadingStatus = useSelector(state => state.products.loadingStatus);
    let errorMessage = useSelector(state => state.products.error);
    useEffect(() => {
        dispatch(fetchProductData());
    }, []);
    return(
        <div className="application">
            {
                !loadingStatus || loadingStatus === "loading" ?
                    <div>Loading...</div>:
                    loadingStatus === "failed" ?
                        <ErrorPage errorMessage={errorMessage} />:
                        <Routes>
                            <Route path="/" element={<PageLayer />}>
                                <Route index={true} element={<About />} />
                                <Route path="products" element={<ProductList />} />
                                <Route path="products/:id" element={<CardDetail />} />
                                <Route path="new" element={<NewProduct />} />
                            </Route>
                        </Routes>
            }

        </div>
    )
}

export default App;