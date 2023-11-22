import './AdressForm.css';
import { NavLink } from "react-router-dom";
import close from './img/Frame_57.png';
import Navbar from '../Navbar/Navbar';
import { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Metka from './img/metka.png';
import 'leaflet/dist/leaflet.css'

function AdressForm( { currentItem, onShowMenuBlock, showMenuBlock, invalidAdress, final_sign_up } ) {

    const [mapCenter, setMapCenter] = useState([55.616981, 37.323904]);
    const [address, setAddress] = useState({ settlement: '', street: '', house: '' });

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

    return (
        <div>
        {window.innerWidth < 800 ? (
            <div>
                <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
                <div className="address-form">
                    <div className="adress-title">Адрес доставки</div>
                    <input className="input" id="adress" type="text" placeholder="Населенный пункт" value={"КП 'Бристоль'"} readOnly/>
                        <div className="row">
                            <input className="input" id="street" type="text" placeholder="Улица" defaultValue={address.street} readOnly />
                            <input className="input" id="house" type="text" placeholder="Дом" defaultValue={address.house} readOnly />
                        </div>
                    <div className="map">
                        <div>
                            <Map
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
                            </Map>
                        </div>
                    </div>
                    <NavLink exact="true" to="/profile" className="reg-btn">Завершить</NavLink>
                </div>
            </div>
        ):(
            <div className="adress">
                <div className="address-form">
                    <div className="address-form-inputs">
                        <div className="adress-title">Адрес доставки</div>
                        <input className="input" id="adress" type="text" placeholder="Населенный пункт" value={"КП 'Бристоль'"} readOnly />
                        <div className="row">
                            <input className="input" id="street" type="text" placeholder="Улица" defaultValue={address.street}/>
                            <input className="input" id="house" type="text" placeholder="Дом" defaultValue={address.house}/>
                        </div>
                        <NavLink id="final_sign_up" exact="true" to="/profile"></NavLink>
                        <div className="adress-btn" onClick={final_sign_up}>Сохранить</div>
                    </div>
                    <div className="map">
                        <div>
                            <Map
                                center={mapCenter}
                                zoom={17}
                                style={{ height: '600px', width: '475px' }}
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
                            </Map>
                        </div>
                    </div>
                    <div className="close"><NavLink exact="true" to="/"><img alt ="" src={close} /></NavLink></div>
                </div>
            </div>
        )}
        </div>
    );
}

export default AdressForm