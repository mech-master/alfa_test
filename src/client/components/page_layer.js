import React from "react";
import {Outlet} from "react-router";

const PageLayer = () => {
    return(
        <>
            <header className="page-header">
                [Logo]
            </header>
            <main className="page-main">
                <Outlet />
            </main>
            <footer className="page-footer">
                [Footer Logo]
            </footer>
        </>
    )
}

export default PageLayer;