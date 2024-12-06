import React from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router";
import {deleteProduct, setFavorite} from "../../store/slices/productListSlice";

export const About = () => {
    return(
        <section className="page-main__page-about">
            Вступительное тестирование от Альфа
        </section>
    )
}

export const Card = ({id, title, images, description, price, stock, isFavorite, onDelete = f => f, onFavorite = f => f}) => {
    const navigate = useNavigate();
    return(
        <li className="product-list__card card">
            <div className="card__wrapper" onClick={() => navigate(`${id}`)}>
                <h2 className="card__product-name product-name">{title}</h2>
                <img className="card__product-picture product-picture" width="300" height="250" src={images[0]} />
                <p className="card__description description">{description}</p>
                <p className="card__price-and-stock">
                    <span className="price">Цена: ${price}</span>
                    <span className="stock">На складе: {stock} шт</span>
                </p>
            </div>
            <button className={`card__favorite ${isFavorite ? 'is-favorite' : ''}`} onClick={() => onFavorite(id)}>like</button>
            <button className="card__delete" onClick={() => onDelete(id)}>x</button>
        </li>
    )
}

export const ProductList = () => {
    const products = useSelector(state => state.products.originProducts);
    const dispatch = useDispatch();
    const onDeleteProduct = (id) => {
        dispatch(deleteProduct({id}))
    }
    const onSetFavorite = (id) => {
        dispatch(setFavorite({id}))
    }
    return(
        <section className="page-main__product-container product-container">
            <h1 className="product-container__title title">Список товаров</h1>
            <div className="product-container__wrapper">
                <section className="product-container__product-filter product-filter">
                    <div className="filter-group">
                        <input type="radio" name="filter" id="full" value="full" checked/><label htmlFor="full">Полный список</label>
                    </div>
                    <div className="filter-group">
                        <input type="radio" name="filter" id="favorite" value="favorite"/><label htmlFor="favorite">Только избранные</label>
                    </div>
                </section>
                <ul className="product-container__product-list product-list">
                    {
                        products.map(
                            item => <Card {...item} key={item.id} onDelete={onDeleteProduct} onFavorite={onSetFavorite}/>
                        )
                    }
                </ul>
            </div>
        </section>
    )
}

export const ErrorPage = ({errorMessage = ""}) => {
    return(
        <div>
            Запрос списка товаров закончится ошибкой: {errorMessage}
        </div>
    )
}