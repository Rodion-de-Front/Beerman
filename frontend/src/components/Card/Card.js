import './Card.css';
import Icon from './img/Icon_Fill.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Card({ onShowProduct, onShowAddButtons, showAddButtons, onLink, product }) {

  const [addProduct, setAddProduct] = useState(false);
  const [divQuantity, setDivQuantity] = useState(1);
  const [count, setCount] = useState(0);
  const [countForDiv, setCountForDiv] = useState(1);
  const [cartItemId, setCartItemId] = useState(0);
  let quantity = 1

  // Проверка, что product определен
  if (!product) {
    return <div>Product is undefined</div>;
  }

  // Деструктурирование свойств после проверки
  const { id, price, name, description, image } = product;

  const cardStyle = {
    // backgroundImage: `url(${image})`,
  };

  const deleteData = async () => {
    try {
      const response = await fetch(`https://biermann-api.onixx.ru/api/cart/delete/${cartItemId}`, {
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
  };

  const toggleAddButtons = (e) => {
    e.stopPropagation();
    setAddProduct(!addProduct);
    setDivQuantity(divQuantity + 1)

    const data = {
      "product_id": id,
      "quantity": divQuantity,
    };

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
    setCountForDiv(countForDiv + 1)

    const data = {
      "product_id": id,
      "quantity": divQuantity,
    };

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
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });
    }
  }

  const minusProduct = (e) => {

    e.stopPropagation();

    if (countForDiv === 1) {
      deleteData();
      setAddProduct(!addProduct);
      setDivQuantity(divQuantity - 1)
      return
    }

    quantity -= 1
    setDivQuantity(divQuantity - 1)
    setCount(count - 1)
    setCountForDiv(countForDiv - 1)

    let data = {
      "product_id": id,
      "quantity": count,
    };

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
          setCartItemId(responseData.id)
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
              setCartItemId(responseData.id)
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });
    }
  }

  return (
    <div id={id} className="card" onClick={() => onShowProduct(id)}>
      <div className="card-photo" style={cardStyle}><img src={image} /></div>
      <div className="card-text">
        <div className="price">{price + ' ₽'}</div>
        <div className="name">{name}</div>
        <div className="description">{description}</div>
        {!addProduct ? (
          <button className="card-btn" onClick={toggleAddButtons}>
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
  );
}

export default Card;
