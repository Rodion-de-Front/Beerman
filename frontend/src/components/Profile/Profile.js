import FullForm from '../FullForm/FullForm';
import Navbar from '../Navbar/Navbar';
import React, { useState } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import Metka from './img/metka.png';
import 'leaflet/dist/leaflet.css'
import './Profile.css';

function Profile( {currentItem, onShowMenuBlock, showMenuBlock} ) {

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
            <div className="profile">
                <Navbar onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
                    <div className="profile-form">
                        <div className="form-title">Личный кабинет</div>
                        <FullForm />
                        <div className="form-title adress-title">Адрес доставки</div>
                        <input className="input" id="adress" type="text" placeholder="Населенный пункт" value={"КП 'Бристоль'"}/>
                        <div className="row">
                            <input className="input" id="street" type="text" placeholder="Улица" value={address.street}/>
                            <input className="input" id="house" type="text" placeholder="Дом" value={address.house}/>
                        </div>
                        <div className="profile-map">
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
                                    <img className="metka" src={Metka} alt="" style={{ maxWidth: '100%' }} />
                                    <div className="nahuy-hohlov">Наведите метку на свой дом</div>
                                </Map>
                            </div>
                        </div>
                        <button className="save-btn">Сохранить</button>
                    </div>
            </div>
        ):(
            <div className="profile">
                <Navbar currentItem={currentItem} />
                <div className="profile-elements">
                    <div className="profile-form">
                        <div className="form-title">Профиль</div>
                        <FullForm />
                        <div className="input-name">Адрес доставки</div>
                        <input className="input" id="profile-adress" type="text" placeholder="Населенный пункт" value={"КП 'Бристоль'"} readOnly/>
                        <div className="row">
                            <input className="input" id="profile-street" type="text" placeholder="Улица" value={address.street}/>
                            <input className="input" id="profile-house" type="text" placeholder="Дом" value={address.house}/>
                        </div>
                        <button className="save-btn">Сохранить</button>
                    </div>
                    <div className="profile-map">
                        <div>
                            <Map
                                center={mapCenter}
                                zoom={17}
                                style={{ height: '800px', width: '575px' }}
                                onMoveend={handleMoveEnd}
                            >
                                <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                />
                                <img className="metka" src={Metka} alt="" style={{ maxWidth: '100%' }} />
                                <div className="nahuy-hohlov">Наведите метку на свой дом</div>
                            </Map>
                        </div>
                    </div>
                </div>
            </div>
        )}
        </div>

    );
}

export default Profile