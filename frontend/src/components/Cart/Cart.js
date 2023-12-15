import { useState, useEffect } from 'react';
import Navbar from '../Navbar/Navbar';
import SelectedGoods from '../SelectedGoods/SelectedGoods';
import './Cart.css';
import pen from './img/Rectangle.png';
import Metka from './img/metka.png';
import open from './img/Vector.png';
import { NavLink } from 'react-router-dom';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import close from './img/Frame_57.png';

function Cart({ currentItem, onShowMenuBlock, showMenuBlock, beforeSecondSpace, afterSecondSpace, profileName }) {


  const [changedAddress, setChangedAddress] = useState(false);
  const [wayOfPay, setWayOfPay] = useState(false);
  const [auth, setAuth] = useState(false);
  const [mapCenter, setMapCenter] = useState([55.616981, 37.323904]);
  const [address, setAddress] = useState({ settlement: '', street: '', house: '' });
  const [showOverlay, setShowOverlay] = useState(false);
  const [invalidAdress, setInvalidAdress] = useState(false);


  function changeWayofPay() {
    setWayOfPay(!wayOfPay)
  }

  function showChangeAddress() {
    setChangedAddress(!changedAddress);
    setShowOverlay(true);
    document.body.classList.add('no-scroll');
  }

  function closeChangeAddress() {
    setChangedAddress(false);
    setShowOverlay(false);
    document.body.classList.remove('no-scroll');
  }

  function changeAddress() {
    let street = document.getElementById("street").value
    let house = document.getElementById("house").value

    if (street !== "улица Диккенса" && street !== "улица Шекспира" && street !== "улица Киплинга") {

        setInvalidAdress(true)

    } else {
        document.getElementById("delivery-adress").textContent = "КП 'Бристоль' " + street + " " + house
        setInvalidAdress(false)
        closeChangeAddress()
        address.street = ''
        address.house = ''
    }
  }

  useEffect(() => {
    if (beforeSecondSpace === '') {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, []);

  const handleMoveEnd = (e) => {
    const { lat, lng } = e.target.getCenter();
    setMapCenter([lat, lng]);

    // Simulate reverse geocoding using OpenStreetMap Nominatim API
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
      .then((response) => response.json())
      .then((data) => {
        const { address } = data;
        const settlement = address.village || address.suburb || address.city || 'Адрес не добавлен';
        const street = address.road || '';
        const house = address.house_number || '';
        setAddress({ settlement, street, house });
      })
      .catch((error) => {
        console.error('Error fetching address:', error);
      });
  };

  const HandlerComponent = () => {
    const map = useMapEvents({
      moveend: handleMoveEnd,
    });

    return null;
  };

  const [cart, setCart] = useState([])
  const [cartItems, setCartItems] = useState([])

  function fetchData() {
    if (localStorage.getItem("token") === null) {

      fetch(`https://biermann-api.onixx.ru/api/cart/all?cart_id=${localStorage.getItem("cart_id")}`, {
      method: "GET",
      })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          setCart(data)
          setCartItems(data.items)
      })
      .catch((error) => {
          console.log(error);
      });

    } else {

      console.log(localStorage.getItem("token"))

      fetch('https://biermann-api.onixx.ru/api/cart/all', {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token")
        },
      })
      .then((response) => response.json())
      .then((data) => {
          console.log(data);
          setCart(data)
          setCartItems(data.items)
      })
      .catch((error) => {
          console.log(error);
      });
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  const [offered, setOffer] = useState(false)
  function makeOffer() {

    setOffer(true)

    const data = {
        "comment": document.getElementById("comment").value,
        "user_cash": 0
    }

    fetch('https://biermann-api.onixx.ru/api/order/create', {
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
              localStorage.removeItem("cart_id")
              const productIds = cartItems.map(item => item.product_id);
              productIds.forEach(productId => {
                localStorage.removeItem(productId);
              });
          })
          .catch(error => {
              console.error('Ошибка:', error);
          });
  }

  return (

    <div>
    {!offered ? (
      <div>
      <Navbar profileName={profileName} onShowMenuBlock={onShowMenuBlock} showMenuBlock={showMenuBlock} currentItem={currentItem} />
      <div className='cart-paper'>
      <div className="cart-title">Корзина</div>
      <div className={`cart ${changedAddress ? 'cart-blur' : ''}`}>
      <div className="goods-container">
        {cartItems ? (
          cartItems.map((cartItem) => (
            <SelectedGoods fetchData={fetchData} key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <div className="delivery-adress">Ваша корзина пуста</div>
        )}
      </div>
        <div className="delivery-data">
          <div className="delivery-block">
            <div className="del-row">
              <div className="delivery-tittle">Адрес доставка</div>
              {!auth ? (
                <div></div>
              ):(
                <img className="pen" alt="" src={pen} onClick={showChangeAddress} />
              )}
            </div>
            <div id="delivery-adress" className="delivery-adress">
              {beforeSecondSpace && afterSecondSpace ? `КП 'Бристоль' ${beforeSecondSpace} ${afterSecondSpace}` : 'Вам необходимо авторизоваться'}
            </div>
          </div>
          {/* <div className="delivery-block">
            {!wayOfPay ? (
              <div>
              <div className="del-row">
                <div className="payment delivery-tittle">Оплата наличными</div>
                <img alt="" className="open" src={open} onClick={changeWayofPay}/>
              </div>
              <input id="change" className="change-input" placeholder="Сдача с..." />
              </div>
            ):(
              <div className="del-row">
                <div className="payment delivery-tittle">Оплата картой</div>
                <img alt="" className="open" src={open} onClick={changeWayofPay}/>
              </div>
            )}
          </div> */}
          {window.innerWidth < 800 ? (
            <div>
              <div className="delivery-block">
                <div className="delivery-tittle">Комментарий</div>
                <textarea id = "comment" placeholder="Напишите сюда свои пожелания"></textarea>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="delivery-description">Товары ({cart.items_count})</div>
                  <div className="delivery-price">{cart.items_price} ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="delivery-description">Доставка</div>
                  <div className="delivery-price">{cart.delivery_price} ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="total delivery-tittle">
                    <b>Итого</b>
                  </div>
                  <div className="final-price">
                    <b>{cart.total_price} ₽</b>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="delivery-description">Товары ({cart.items_count})</div>
                  <div className="delivery-price">{cart.items_price} ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="delivery-description">Доставка</div>
                  <div className="delivery-price">{cart.delivery_price} ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="total delivery-tittle">Итого</div>
                  <div className="final-price">{cart.total_price} ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-tittle">Комментарий</div>
                <textarea id = "comment" placeholder="Можем оставить у двери или предварительно позвонить"></textarea>
              </div>
            </div>
          )}
          {!auth ? (
            <NavLink exact="true" to="/login">
              <button className="order-btn">Авторизоваться</button>
            </NavLink>
          ) : (
            <button className="order-btn" onClick={makeOffer}>Заказать</button>
          )}
        </div>
      </div>
      {changedAddress && (
        <div>
        {window.innerWidth < 800 ? (
            <div>
            <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
            <div className="cart-map">
                <div className="adress-title">Адрес доставки</div>
                <input className="input" id="adress" type="text" placeholder="Населенный пункт" value={"КП 'Бристоль'"} readOnly/>
                    <div className="row">
                        <input className="input" id="street" type="text" placeholder="Улица" defaultValue={address.street}/>
                        <input className="input" id="house" type="text" placeholder="Дом" defaultValue={address.house}/>
                    </div>
                <div className="">
                    <div>
                        <MapContainer
                            center={mapCenter}
                            zoom={17}
                            style={{ height: '500px', width: '320px' }}
                            onMoveend={handleMoveEnd}
                        >
                            <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <img className="metka" src={Metka} alt="" style={{ maxWidth: '100%' }} />
                            <div className="nahuy-hohlov">Наведите метку на свой дом</div>
                            <HandlerComponent />
                        </MapContainer>
                    </div>
                </div>
                <NavLink id="final_sign_up" exact="true" to="/profile"></NavLink>
                <div className="adress-btn" onClick={changeAddress}>Сохранить</div>
                <div className="close"><img alt ="" src={close} onClick={closeChangeAddress}/></div>
            </div>
        </div>
        ):(
        <div className="cart-map">
            <div className="address-form">
              <div className="address-form-inputs">
                <div className="adress-title">Адрес доставки</div>
                <input className="input" id="adress" type="text" placeholder="Населенный пункт" value={"КП 'Бристоль'"} readOnly />
                <div className="row">
                  <input className="input" id="street" type="text" placeholder="Улица" defaultValue={address.street} />
                  <input className="input" id="house" type="text" placeholder="Дом" defaultValue={address.house} />
                </div>
                <NavLink id="final_sign_up" exact="true" to="/profile"></NavLink>
                <div className="adress-btn" onClick={changeAddress}>
                  Сохранить
                </div>
              </div>
              <div className="map">
                <div>
                  <MapContainer center={mapCenter} zoom={17} style={{ height: '600px', width: '475px' }} onMoveend={handleMoveEnd}>
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <img className="metka" src={Metka} alt="" style={{ maxWidth: '100%' }} />
                    <div className="nahuy-hohlov">Наведите метку на свой дом</div>
                    <HandlerComponent />
                  </MapContainer>
                </div>
              </div>
              <div className="close" onClick={closeChangeAddress}>
                <img alt="" src={close} />
              </div>
            </div>
        </div>
        )}
        </div>
      )}
    </div>
    </div>
      ):(
        <div>
          <Navbar profileName={profileName} onShowMenuBlock={onShowMenuBlock} showMenuBlock={showMenuBlock} currentItem={currentItem} />
          {window.innerWidth < 800 ? (
            <div className="offered-block">
                <div className="offered-info">
                  <div className="offered-info-text">
                    ЗАКАЗ ПРИЕДЕТ<br></br>В ТЕЧЕНИЕ 30 МИНУТ
                  </div>
                  <div className="offered-info-number-title">
                    По всем вопросам
                  </div>
                  <div className="offered-info-number">
                    8 (915) 327-56-83
                  </div>
                </div>
            </div>
          ):(
            <div className="offered-block">
                  <div className="offered-info">
                      <div className="offered-info-text">
                        ЗАКАЗ ПРИЕДЕТ<br></br>В ТЕЧЕНИЕ 30 МИНУТ
                      </div>
                      <div className="offered-info-number-title">
                        По всем вопросам
                      </div>
                      <div className="offered-info-number">
                        8 (915) 327-56-83
                      </div>
                  </div>
            </div>
          )}
        </div>
    )}
    </div>
  );
}

export default Cart;
