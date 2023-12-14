import FullForm from '../FullForm/FullForm';
import Navbar from '../Navbar/Navbar';
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import Metka from './img/metka.png';
import 'leaflet/dist/leaflet.css'
import './Profile.css';

function Profile( {currentItem, onShowMenuBlock, showMenuBlock, trimedStreet, trimedHouse, updateUser, update, misMatch, profileName} ) {

    const [data, setData] = useState([])

    const [beforeSecondSpace, setBeforeSecondSpace] = useState('');
    const [afterSecondSpace, setAfterSecondSpace] = useState('');

    useEffect(() => {
        fetch("https://biermann-api.onixx.ru/api/user/profile", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        })
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            setData(data);

            // Разделяем строку по пробелам
            var myString = data.address;
            var words = myString.split(' ');

            // Если второго пробела нет, массив будет содержать только один элемент
            var beforeSecondSpace = words.slice(0)[0] + " " + words.slice(0)[1]
            setBeforeSecondSpace(beforeSecondSpace);

            // Берем все элементы после второго пробела и объединяем их обратно в строку
            var afterSecondSpace = words.slice(2).join('') || '';
            setAfterSecondSpace(afterSecondSpace);

            document.getElementById("profile-street").value = beforeSecondSpace
            document.getElementById("profile-house").value = afterSecondSpace
            document.getElementById("name").value = data.username
            document.getElementById("login").value = data.email
            document.getElementById("number").value = data.phone

        })
        .catch((error) => {
            //console.log(error);
        });
    }, []);


    const [availableUpdate, setAvailableUpdate] = useState(false);

    function formChange() {

        setAvailableUpdate(true)

    }

    const [mapCenter, setMapCenter] = useState([55.616981, 37.323904]);
    const [address, setAddress] = useState({ settlement: '', street: '', house: '' });
    const [enter, setEnter] = useState(0)

    const handleMoveEnd = (e) => {

        setEnter(1)

        const { lat, lng } = e.target.getCenter();
        setMapCenter([lat, lng]);

        // Simulate reverse geocoding using OpenStreetMap Nominatim API
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
            .then((response) => response.json())
            .then((coordinates) => {
            const { address } = coordinates;
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

        if (enter > 0) {
            document.getElementById("profile-street").value = address.street
            document.getElementById("profile-house").value = address.house
            formChange()
        }

        const map = useMapEvents({
            moveend: handleMoveEnd
        });

        return null;
    };

    return (
        <div>
        {window.innerWidth < 800 ? (
            <div className="profile">
                <Navbar profileName = {profileName} onShowMenuBlock = {onShowMenuBlock} showMenuBlock = {showMenuBlock} currentItem={currentItem} />
                    <div className="profile-form" onChange={formChange}>
                        <div className="form-title">Личный кабинет</div>
                        <FullForm misMatch = {misMatch} data = {data} />
                        <div className="form-title adress-title">Адрес доставки</div>
                        <input className="input" id="profile-adress" type="text" placeholder="Населенный пункт" defaultValue={"КП 'Бристоль'"}/>
                        <div className="row">
                            <input className="input" id="profile-street" type="text" placeholder="Улица" defaultValue={"улица" + trimedStreet}/>
                            <input className="input" id="profile-house" type="text" placeholder="Дом" defaultValue={trimedHouse}/>
                        </div>
                        <div className="profile-map">
                            <div>
                                <MapContainer
                                    center={mapCenter}
                                    zoom={17}
                                    style={{ height: '500px', width: '320px' }}
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
                        {availableUpdate ? (
                            <div>
                                {!update ? (
                                    <button className="save-btn" onClick={updateUser}>Сохранить</button>
                                ):(
                                    <div className="row-update">
                                        <button className="save-btn-update">Сохранить</button>
                                    </div>
                                )}
                            </div>
                        ):(
                            <button className="save-btn">Сохранить</button>
                        )}
                    </div>
            </div>
        ):(
            <div className="profile">
                <Navbar profileName = {profileName} currentItem={currentItem} />
                <div className="profile-elements">
                    <div className="profile-form" onChange={formChange}>
                        <div className="form-title">Профиль</div>
                        <FullForm misMatch = {misMatch} data = {data} />
                        <div className="input-name">Адрес доставки</div>
                        <input className="input" id="profile-adress" type="text" placeholder="Населенный пункт" defaultValue={"КП 'Бристоль'"} readOnly/>
                        <div className="row">
                            <input className="input" id="profile-street" type="text" placeholder="Улица" defaultValue={trimedStreet}/>
                            <input className="input" id="profile-house" type="text" placeholder="Дом" defaultValue={trimedHouse} />
                        </div>
                        {availableUpdate ? (
                            <div>
                                {!update ? (
                                    <button className="save-btn" onClick={updateUser}>Сохранить</button>
                                ):(
                                    <div className="row-update">
                                        <button className="save-btn-update">Сохранить</button>
                                        <div className="update-title">Изменения сохранены</div>
                                    </div>
                                )}
                            </div>
                        ):(
                            <button className="save-btn">Сохранить</button>
                        )}
                    </div>
                    <div className="profile-map">
                        <div>
                            <MapContainer
                                center={mapCenter}
                                zoom={17}
                                style={{ height: '800px', width: '575px' }}
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
                </div>
            </div>
        )}
        </div>

    );
}

export default Profile