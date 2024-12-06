import express from "express";
import bodyParser from "body-parser";
import compression from "compression";
import logger from "morgan";
import cors from "cors";
import errorHandler from "errorhandler";
import helmet from "helmet";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router";

import ClientApp from "../client/components/App";
import storeFactory from "../store/storeFactory";

const PORT = 3001;
const app = express();
const store = storeFactory(true);

app.set('view engine', 'hbs');
app.use(compression());
app.use(logger('dev'));
app.use(errorHandler());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet())
app.use(express.static("dist"));

app.get("*", (request, response) => {
    response.status(200).render(
        "index",
        {
            page: ReactDOMServer.renderToString(
                <Provider store={store}>
                    <StaticRouter location={request.originalUrl}>
                        <ClientApp />
                    </StaticRouter>
                </Provider>
            )
        }
    )
})

app.listen(PORT, () => {
    console.log(`Server is started on port: ${PORT} ...`);
})