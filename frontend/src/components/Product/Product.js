import './Product.css';
import close from './img/Vector.png';
import mob_close from './img/Vector-2.png';
import Icon from './img/Icon_Fill.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Product( {onShowProduct, onLink, items} ) {

    const [addProduct, setAddProduct] = useState(false);
    const [divQuantity, setDivQuantity] = useState(1);
    const [count, setCount] = useState(0);
    const [countForDiv, setCountForDiv] = useState(1);
    const [cartItemId, setCartItemId] = useState(0);
    let quantity = 1

    // const cardStyle = {
    //   backgroundImage: `url(data:image/png;base64, ${image})`,
    //   borderRadius: '5px 5px 0 0',
    //   backgroundSize: 'cover',
    // };

    // const deleteData = async () => {
    //   try {
    //     const response = await fetch(`https://biermann-api.onixx.ru/api/cart/delete/${cartItemId}`, {
    //       method: 'DELETE',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         // Дополнительные заголовки, если необходимо
    //       },
    //     });

    //     if (!response.ok) {
    //       throw new Error('Ошибка при удалении данных');
    //     }

    //     console.log('Данные успешно удалены');
    //   } catch (error) {
    //     console.error('Ошибка:', error);
    //   }
    // };

    const toggleAddButtons = (e) => {
    //   e.stopPropagation();
    //   setAddProduct(!addProduct);
    //   setDivQuantity(divQuantity + 1)

    //   const data = {
    //     "product_id": id,
    //     "quantity": divQuantity,
    //   };

    //   console.log(JSON.stringify(data))

    //   if (localStorage.getItem("token") === null) {

    //     fetch('https://biermann-api.onixx.ru/api/cart/add', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data),
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Ошибка при отправке запроса');
    //         }
    //         return response.json();
    //     })
    //     .then(responseData => {
    //         // Обработка успешного ответа
    //         console.log(responseData);
    //     })
    //     .catch(error => {
    //         console.error('Ошибка:', error);
        // });

    //   } else {

    //     fetch('https://biermann-api.onixx.ru/api/cart/add', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + localStorage.getItem("token")
    //           },
    //           body: JSON.stringify(data),
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Ошибка при отправке запроса');
    //             }
    //             return response.json();
    //         })
    //         .then(responseData => {
    //             // Обработка успешного ответа
    //             console.log(responseData);
    //         })
    //         .catch(error => {
    //             console.error('Ошибка:', error);
    //         });
    //   }
    };

    const addProductCart = (e) => {

    //   e.stopPropagation();

    //   quantity += 1
    //   setDivQuantity(divQuantity + 1)
    //   setCount(count + 1)
    //   setCountForDiv(countForDiv + 1)

    //   const data = {
    //     "product_id": id,
    //     "quantity": divQuantity,
    //   };

    //   console.log(JSON.stringify(data))

    //   if (localStorage.getItem("token") === null) {

    //     fetch('https://biermann-api.onixx.ru/api/cart/add', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data),
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Ошибка при отправке запроса');
    //         }
    //         return response.json();
    //     })
    //     .then(responseData => {
    //         // Обработка успешного ответа
    //         console.log(responseData);
    //     })
    //     .catch(error => {
    //         console.error('Ошибка:', error);
    //     });

    //   } else {

    //     fetch('https://biermann-api.onixx.ru/api/cart/add', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + localStorage.getItem("token")
    //           },
    //           body: JSON.stringify(data),
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Ошибка при отправке запроса');
    //             }
    //             return response.json();
    //         })
    //         .then(responseData => {
    //             // Обработка успешного ответа
    //             console.log(responseData);
    //         })
    //         .catch(error => {
    //             console.error('Ошибка:', error);
    //         });
    //   }
    }

    const minusProduct = (e) => {

    //   e.stopPropagation();

    //   if (countForDiv === 1) {
    //     deleteData();
    //     setAddProduct(!addProduct);
    //     setDivQuantity(divQuantity - 1)
    //     return
    //   }

    //   quantity -= 1
    //   setDivQuantity(divQuantity - 1)
    //   setCount(count - 1)
    //   setCountForDiv(countForDiv - 1)

    //    let data = {
    //     "product_id": id,
    //     "quantity": count,
    //   };

    //   console.log(JSON.stringify(data))

    //   if (localStorage.getItem("token") === null) {

    //     fetch('https://biermann-api.onixx.ru/api/cart/add', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json'
    //       },
    //       body: JSON.stringify(data),
    //     })
    //     .then(response => {
    //         if (!response.ok) {
    //             throw new Error('Ошибка при отправке запроса');
    //         }
    //         return response.json();
    //     })
    //     .then(responseData => {
    //         // Обработка успешного ответа
    //         console.log(responseData);
    //         setCartItemId(responseData.id)
    //     })
    //     .catch(error => {
    //         console.error('Ошибка:', error);
    //     });

    //    } else {

    //     fetch('https://biermann-api.onixx.ru/api/cart/add', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': 'Bearer ' + localStorage.getItem("token")
    //           },
    //           body: JSON.stringify(data),
    //         })
    //         .then(response => {
    //             if (!response.ok) {
    //                 throw new Error('Ошибка при отправке запроса');
    //             }
    //             return response.json();
    //         })
    //         .then(responseData => {
    //             // Обработка успешного ответа
    //             console.log(responseData);
    //             setCartItemId(responseData.id)
    //         })
    //         .catch(error => {
    //             console.error('Ошибка:', error);
    //         });
    //   }
    }


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
                    <div className="product-card-about-text">{items.color} {items.aroma}</div>
                    <div className="product-card-name-taste-title">Вкусовые сочетания</div>
                    <div className="product-card-taste-text">{items.combination} {items.taste}</div>
                    {!addProduct ? (
          <button className="card-product-btn" onClick={toggleAddButtons}>
            В корзину
          </button>
        ) : (
          <div className="add-btns">
            <button className="cart-btn" onClick={minusProduct}>-</button>
            <div className="added-quantity">{countForDiv}</div>
            <button className="cart-btn" onClick={addProductCart}>+</button>
            <NavLink exact="true" to="/cart">
              <button className="add-to-cart-btn" onClick={onLink}>
                <img alt="" src={Icon} />
              </button>
            </NavLink>
          </div>
        )}
                </div>
            </div>
        </div>
    );
}

export default Product