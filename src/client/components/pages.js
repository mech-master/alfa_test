import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {deleteProduct, setFavorite, setFilter, addNewProduct} from "../../store/slices/productListSlice";

export const About = () => {
    return(
        <section className="page-main__page-about">
            Вступительное тестирование от Альфа
        </section>
    )
}

export const Card = ({id, title, images, description, price, stock, isFavorite, onDelete = f => f, onFavorite = f => f, onCart = f => f}) => {
    const navigate = useNavigate();
    const handleFavorite = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        onFavorite(id)
    }
    const handleCart = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
    }
    const handleDelete = (evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        onDelete(id);
    }
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
            <a href="#" className={`card__favorite favorite ${isFavorite ? 'is-favorite' : ''}`} onClick={(evt) => handleFavorite(evt)}>like</a>
            <div className="card__control control">
                <a href="#" className="control__cart btn btn-green" onClick={(evt) => handleCart(evt)}>В корзину</a>
                <a href="#" className="control__delete btn btn-dangerous" onClick={(evt) => handleDelete(evt)}>Удалить</a>
            </div>
        </li>
    )
}

export const ProductList = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.originProducts);
    const filter = useSelector(state => state.products.filter);
    const filters = [
        {
            "id": "full",
            "value": "none",
            "title": "Полный список"
        },
        {
            "id": "favorite",
            "value": "favorite",
            "title": "Только избранные"
        }
    ]
    const filteredList = (products, filter) => {
        switch (filter) {
            case "favorite": {
                return products.filter((item) => item.isFavorite)
                break;
            }
            default: return products
        }
    }
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
                    <FilterList filters={filters} filter={filter}/>
                </section>
                <ul className="product-container__product-list product-list">
                    {
                        filteredList(products, filter).map(
                            item => <Card {...item} key={item.id} onDelete={onDeleteProduct} onFavorite={onSetFavorite}/>
                        )
                    }
                </ul>
            </div>
        </section>
    )
}

const FilterList = ({filters = [], filter = "none"}) => {
    const dispatch = useDispatch();
    const onSetFilter = (evt) => {
        dispatch(setFilter({filter: evt.target.value}))
    }
    return(
        <ul className="product-filter__filters filters">
            {
                filters.map((item, index) =>
                    <li className="filter-item" key={index}>
                        <input
                            type="radio"
                            name="filter"
                            id={item.id}
                            value={item.value}
                            checked={item.value === filter}
                            onChange={(evt) => onSetFilter(evt)}
                        />
                        <label htmlFor={item.id}>{item.title}</label>
                    </li>
                )
            }
        </ul>
    )
}

export const CardDetail = () => {
    const params = useParams();
    const navigate = useNavigate();
    const product = useSelector(
        state => state.products.originProducts.find(item => String(item.id) === params.id)
    );
    const onReturn = (evt) => {
        evt.preventDefault();
        navigate("/products");
    }
    return(
        <section className="page-main__detail detail">
            {
                !product ?
                    <div className="detail__error product-not-found">{`Товар с id: ${params.id} не найден`}</div> :
                    <div className="detail__wrapper">
                        <h2 className="detail__caption">Данные о товаре:</h2>
                        <div className="detail__content">
                            <h3 className="detail__title">{product.title}</h3>
                            <img className="detail__picture" src={product.images[0]} width="600" height="500"/>
                            <p className="detail__description">Описание: {product.description}</p>
                            <p className="detail__price">Цена: {product.price}</p>
                            <p className="detail__stock">Остаток на складе: {product.stock}</p>
                        </div>
                        <a href="#" className="detail__return btn" onClick={(evt) => onReturn(evt)}>На стриницу списка товаров</a>
                    </div>
            }
        </section>
    )
}

export const NewProduct = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSend = (evt) => {
        evt.preventDefault();
        const title = document.getElementById("new-product__title");
        const picture = document.getElementById("new-product__picture");
        const description = document.getElementById("new-product__description");
        const price = document.getElementById("new-product__price");
        const stock = document.getElementById("new-product__stock");

        if (title.value == "") {
            title.focus();
            return;
        }
        if (picture.value == "") {
            picture.focus();
            return;
        }
        if (description.value == "") {
            description.focus();
            return;
        }
        if (price.value == "" || parseFloat(price.value) <= 0) {
            price.focus();
            return;
        }
        if (stock.value == "" || parseFloat(stock.value) <= 0) {
            stock.focus();
            return;
        }

        dispatch(addNewProduct({
            title: title.value,
            picture: picture.value,
            description: description.value,
            price: price.value,
            stock: stock.value
        }))

        navigate("/products")
    }
    return(
        <section className="main-page__new-product">
            <h2 className="new-product__caption"></h2>
            <div className="new-product__wrapper">
                <div className="new-product__field-group">
                    <label htmlFor="new-product__title">Наименование:</label>
                    <input type="text" maxLength={50} id="new-product__title" className="new-product__title"/>
                </div>
                <div className="new-product__field-group">
                    <label htmlFor="new-product__picture">Фото товара:</label>
                    <input type="text" maxLength={200} id="new-product__picture" className="new-product__picture"/>
                </div>
                <div className="new-product__field-group">
                    <label htmlFor="new-product__description">Описание:</label>
                    <textarea id="new-product__description" className="new-product__description"/>
                </div>
                <div className="new-product__field-group">
                    <label htmlFor="new-product__price">Цена за единицу:</label>
                    <input type="number" step="0.01" maxLength={20} id="new-product__price" className="new-product__price"/>
                </div>
                <div className="new-product__field-group">
                    <label htmlFor="new-product__stock">Остаток на складе:</label>
                    <input type="number" maxLength={20} id="new-product__stock" className="new-product__stock"/>
                </div>
                <div className="new-product__control">
                    <a href="#" className="new-product__send btn btn__send" onClick={(evt) => onSend(evt)}>Записать</a>
                </div>

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