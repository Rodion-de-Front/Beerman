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

  return (
    <div>
      <Navbar profileName={profileName} onShowMenuBlock={onShowMenuBlock} showMenuBlock={showMenuBlock} currentItem={currentItem} />
      <div className='cart-paper'>
      <div className="cart-title">Корзина</div>
      <div className={`cart ${changedAddress ? 'cart-blur' : ''}`}>
        <div className="goods-container">
          <SelectedGoods />
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
                <textarea placeholder="Напишите сюда свои пожелания"></textarea>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="delivery-description">Товары (1)</div>
                  <div className="delivery-price">8 700 ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="delivery-description">Доставка</div>
                  <div className="delivery-price">300 ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="total delivery-tittle">
                    <b>Итого</b>
                  </div>
                  <div className="final-price">
                    <b>8 850 ₽</b>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="delivery-description">Товары (1)</div>
                  <div className="delivery-price">8 700 ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="delivery-description">Доставка</div>
                  <div className="delivery-price">300 ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-row">
                  <div className="total delivery-tittle">Итого</div>
                  <div className="final-price">8 850 ₽</div>
                </div>
              </div>
              <div className="delivery-block">
                <div className="delivery-tittle">Комментарий</div>
                <textarea placeholder="Можем оставить у двери или предварительно позвонить"></textarea>
              </div>
            </div>
          )}
          {!auth ? (
            <NavLink exact="true" to="/login">
              <button className="order-btn">Авторизоваться</button>
            </NavLink>
          ) : (
            <button className="order-btn">Заказать</button>
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
                            {invalidAdress ? (
                                <div className="message-container">
                                <p className="message-text">Cюда нельзя заказать</p>
                                <div className="message-triangle"></div>
                              </div>
                            ):(
                                <img className="metka" src={Metka} alt="" style={{ maxWidth: '100%' }} />
                            )}
                            <div className="nahuy-hohlov">Наведите метку на свой дом</div>
                            <HandlerComponent />
                        </MapContainer>
                    </div>
                </div>
                <NavLink id="final_sign_up" exact="true" to="/profile"></NavLink>
                <div className="adress-btn" onClick={changeAddress}>Сохранить</div>
                <div className="close"><NavLink exact="true" to="/"><img alt ="" src={close} /></NavLink></div>
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
                    {invalidAdress ? (
                      <div className="message-container">
                        <p className="message-text">Cюда нельзя заказать</p>
                        <div className="message-triangle"></div>
                      </div>
                    ) : (
                      <img className="metka" src={Metka} alt="" style={{ maxWidth: '100%' }} />
                    )}
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
  );
}

export default Cart;
