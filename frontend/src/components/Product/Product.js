import './Product.css';
import close from './img/Vector.png';
import mob_close from './img/Vector-2.png';
import Icon from './img/Icon_Fill.png';
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Product( {getCart, onShowProduct, onLink, items, CartItems, setAcrossQuantity, acrossQuantity} ) {

    // Деструктурирование свойств после проверки
  const { id, price, name, description, image } = items;

  const [addProduct, setAddProduct] = useState(false);
  const [divQuantity, setDivQuantity] = useState(1);
  const [count, setCount] = useState(0);
  const [countForDiv, setCountForDiv] = useState(1);
  let quantity = 1

  useEffect(()=>{
    if (localStorage.getItem(id) !== null) {
      setAddProduct(!addProduct)
      console.log(localStorage.getItem(id))
        setCountForDiv(acrossQuantity)
        setDivQuantity(acrossQuantity + 1)
        setCount(acrossQuantity - 1)
    }
  }, [localStorage.getItem(id)])


  // Проверка, что product определен
  if (!items) {
    return <div>Product is undefined</div>;
  }

  const deleteData = async () => {
    try {
      const response = await fetch(`https://biermann-api.onixx.ru/api/cart/delete/${localStorage.getItem(id)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Дополнительные заголовки, если необходимо
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении данных');
      }

      console.log('Данные успешно удалены');
    } catch (error) {
      console.error('Ошибка:', error);
    }
    localStorage.removeItem(id)
    getCart()
  };

  const toggleAddButtons = (e) => {
    e.stopPropagation();
    setAddProduct(!addProduct);
    setDivQuantity(divQuantity + 1)
    let data = {}

    if (localStorage.getItem("cart_id") !== null) {
      data = {
        "product_id": id,
        "quantity": divQuantity,
        "cart_id": localStorage.getItem("cart_id")
      };

    } else {
      data = {
        "product_id": id,
        "quantity": divQuantity,
      };
    }

    console.log(JSON.stringify(data))

    if (localStorage.getItem("token") === null) {

      fetch('https://biermann-api.onixx.ru/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка при отправке запроса');
          }
          return response.json();
      })
      .then(responseData => {
          // Обработка успешного ответа
          console.log(responseData);
          localStorage.setItem(id, responseData.id)
          if (localStorage.getItem("cart_id") === null) {
            localStorage.setItem("cart_id", responseData.cart_id)
          }
      })
      .catch(error => {
          console.error('Ошибка:', error);
      });

    } else {

      fetch('https://biermann-api.onixx.ru/api/cart/add', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Ошибка при отправке запроса');
              }
              return response.json();
          })
          .then(responseData => {
              // Обработка успешного ответа
              console.log(responseData);
              localStorage.setItem(id, responseData.id)
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });
    }
  };

  const addProductCart = (e) => {

    e.stopPropagation();

    quantity += 1
    setDivQuantity(divQuantity + 1)
    setCount(count + 1)
    setAcrossQuantity(acrossQuantity + 1)
    setCountForDiv(countForDiv + 1)

    const data = {
      "quantity": divQuantity,
      'cart_id': localStorage.getItem("cart_id")
    };

    console.log(JSON.stringify(data))

    if (localStorage.getItem("token") === null) {

      fetch(`https://biermann-api.onixx.ru/api/cart/update/${localStorage.getItem(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка при отправке запроса');
          }
          return response.json();
      })
      .then(responseData => {
          // Обработка успешного ответа
          console.log(responseData);
          localStorage.setItem(id, responseData.id)
      })
      .catch(error => {
          console.error('Ошибка:', error);
      });

    } else {

      fetch(`https://biermann-api.onixx.ru/api/cart/update/${localStorage.getItem(id)}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token"),
            },
            body: JSON.stringify(data),
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Ошибка при отправке запроса');
              }
              return response.json();
          })
          .then(responseData => {
              // Обработка успешного ответа
              console.log(responseData);
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });
    }
  }

  const minusProduct = (e) => {

    e.stopPropagation();

    if (acrossQuantity === 1) {
      deleteData();
      setAddProduct(!addProduct);
      setDivQuantity(divQuantity - 1)
      return
    }

    quantity -= 1
    setDivQuantity(divQuantity - 1)
    setCount(count - 1)
    setAcrossQuantity(acrossQuantity - 1)
    setCountForDiv(countForDiv - 1)

    let data = {
      "cart_id": localStorage.getItem("cart_id"),
      "quantity": count,
    };

    console.log(JSON.stringify(data))

    if (localStorage.getItem("token") === null) {

      fetch(`https://biermann-api.onixx.ru/api/cart/update/${localStorage.getItem(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Ошибка при отправке запроса');
          }
          return response.json();
      })
      .then(responseData => {
          // Обработка успешного ответа
          console.log(responseData);
          localStorage.setItem(id, responseData.id)
      })
      .catch(error => {
          console.error('Ошибка:', error);
      });

    } else {

      fetch(`https://biermann-api.onixx.ru/api/cart/update/${localStorage.getItem(id)}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
            body: JSON.stringify(data),
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Ошибка при отправке запроса');
              }
              return response.json();
          })
          .then(responseData => {
              // Обработка успешного ответа
              console.log(responseData);
              localStorage.setItem(id, responseData.id)
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });
    }
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
                    <div className="product-card-about-text"><p>{items.color}</p> <p>{items.aroma}</p> <p>{items.taste}</p></div>
                    <div className="product-card-name-taste-title">Вкусовые сочетания</div>
                    <div className="product-card-taste-text">{items.combination}</div>
                    {!addProduct ? (
                        <button className="card-product-btn" onClick={toggleAddButtons}>
                          В корзину
                        </button>
                      ) : (
                        <div className="add-btns">
                          <button className="cart-btn" onClick={minusProduct}>-</button>
                          <div className="added-quantity">{acrossQuantity}</div>
                          <button className="cart-btn" onClick={addProductCart}>+</button>
                          {/* <NavLink exact="true" to="/cart">
                            <button className="add-to-cart-btn" onClick={onLink}>
                              <img alt="" src={Icon} />
                            </button>
                          </NavLink> */}
                        </div>
                      )}
                </div>
            </div>
        </div>
    );
}

export default Product