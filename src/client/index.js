import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Provider } from "react-redux";
import "./css/style.css";

import App from "./components/App";
import storeFactory from "../store/storeFactory";

const store = storeFactory(false);

const rootNode = createRoot(document.getElementById("root"));
rootNode.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
)
