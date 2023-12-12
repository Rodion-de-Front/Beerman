import './SelectedGoods.css';
import { useState } from 'react';

function SelectedGoods( {cartItem, fetchData} ) {

    const [deleted, setDeleted] = useState(false)
    const [divQuantity, setDivQuantity] = useState(cartItem.quantity);
    const [count, setCount] = useState(cartItem.quantity - 1);
    const [countForDiv, setCountForDiv] = useState(cartItem.quantity);
    const [cartItemId, setCartItemId] = useState(cartItem.id);
    let quantity = 1

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

    const addProductCart = (e) => {

        fetchData()

        e.stopPropagation();

        quantity += 1
        setDivQuantity(divQuantity + 1)
        setCount(count + 1)
        setCountForDiv(countForDiv + 1)

        const data = {
          "quantity": divQuantity + 1,
          'cart_id': localStorage.getItem("cart_id")
        };

        console.log(JSON.stringify(data))

        if (localStorage.getItem("token") === null) {

          fetch(`https://biermann-api.onixx.ru/api/cart/update/${cartItemId}`, {
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
              setCartItemId(responseData.id)
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });

        } else {

          fetch(`https://biermann-api.onixx.ru/api/cart/update/${cartItemId}`, {
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

        fetchData()
      }

      const minusProduct = (e) => {

        fetchData()

        e.stopPropagation();

        if (countForDiv === 1) {
          deleteData();
          setDeleted(true)
          setDivQuantity(divQuantity - 1)
          return
        }

        quantity -= 1
        setDivQuantity(divQuantity - 1)
        setCount(count - 1)
        setCountForDiv(countForDiv - 1)

        let data = {
          "cart_id": localStorage.getItem("cart_id"),
          "quantity": count,
        };

        console.log(JSON.stringify(data))

        if (localStorage.getItem("token") === null) {

          fetch(`https://biermann-api.onixx.ru/api/cart/update/${cartItemId}`, {
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
              setCartItemId(responseData.id)
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });

        } else {

          fetch(`https://biermann-api.onixx.ru/api/cart/update/${cartItemId}`, {
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
                  setCartItemId(responseData.id)
              })
              .catch(error => {
                  console.error('Ошибка:', error);
              });
        }

        fetchData()
      }


    return (
        <div>
        {!deleted &&
        <div id={cartItem.id} className="selected-goods">
            <div className="goods-info">
                <div className="goods-photo"><img src={cartItem.image}/></div>
                <div className="goods-text">
                    <div className="goods-name">
                        {cartItem.name}
                    </div>
                </div>
            </div>
            <div className="price-quantity">
                <div className="goods-price">
                    {cartItem.price} ₽
                </div>
                <div className="goods-quantity">
                    <div className="quantity-btn" onClick={minusProduct}>-</div>
                    <div className="quantity-number">{divQuantity}</div>
                    <div className="quantity-btn" onClick={addProductCart}>+</div>
                </div>
            </div>
        </div>
        }
        </div>
    );
}

export default SelectedGoods