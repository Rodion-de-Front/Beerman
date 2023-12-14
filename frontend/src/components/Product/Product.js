import './Product.css';
import close from './img/Vector.png';
import mob_close from './img/Vector-2.png';
import Icon from './img/Icon_Fill.png';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Product( {onShowProduct, items} ) {

    // Деструктурирование свойств после проверки
  const { id, price, name, description, image } = items;

    return (
        <div id = {items.id} className="product">
            <div className="product-card">
                {window.innerWidth < 800 ? (
                    <div className="close-product-card" onClick={onShowProduct}><img alt="" src={mob_close} /></div>
                    ) : (
                    <div className="close-product-card" onClick={onShowProduct}><img alt="" src={close} /></div>
                )}
                <div className="close-product-card" onClick={onShowProduct}><img alt="" src={close} /></div>
                <div className="product-card-photo"><img src = {items.image} /></div>
                <div className="product-card-text">
                    <div className="product-card-name">{items.name}</div>
                    <div className="product-card-description">{items.description}</div>
                    <div className="product-card-price">{items.price} ₽</div>
                    <div className="product-card-about-title">О пиве</div>
                    <div className="product-card-about-text"><p>{items.color}</p> <p>{items.aroma}</p> <p>{items.taste}</p></div>
                    <div className="product-card-name-taste-title">Вкусовые сочетания</div>
                    <div className="product-card-taste-text">{items.combination}</div>
                    
                </div>
            </div>
        </div>
    );
}

export default Product