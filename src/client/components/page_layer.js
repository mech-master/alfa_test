import React from "react";
import {NavLink, Outlet} from "react-router";

const PageLayer = () => {
    return(
        <>
            <header className="page-header">
                [Logo]
                <nav className="page-header__navigation navigation">
                    <ul className="navigation__wrapper">
                        <li className="navigation-item"><NavLink to="/" className={({isActive}) => `navigation-arrow ${isActive ? "current" : ""}`}>Home</NavLink></li>
                        <li className="navigation-item"><NavLink to="/products" className={({isActive}) => `navigation-arrow ${isActive ? "current" : ""}`}>Товары</NavLink></li>
                        <li className="navigation-item"><NavLink to="/new" className={({isActive}) => `navigation-arrow ${isActive ? "current" : ""}`}>Добавить товар</NavLink></li>
                    </ul>
                </nav>
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