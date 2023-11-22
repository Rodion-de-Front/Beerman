import Login from "./components/Login/Login";
import Beer from "./components/Beer/Beer";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import AdressForm from "./components/AdressForm/AdressForm";
import  { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {

    const images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyg4ujypj5_WBONKq-M64Y8hfFEqh2YCenBQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyg4ujypj5_WBONKq-M64Y8hfFEqh2YCenBQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyg4ujypj5_WBONKq-M64Y8hfFEqh2YCenBQ&usqp=CAU',
        // Добавьте ссылки на свои изображения
    ];

    // показ блока с сортами пива
    const [showSortBlock, setShowSortBlock] = useState(false);

    const toggleSortBlock = () => {
        if (showCountryBlock) {
            setShowCountryBlock(!showCountryBlock);
        }
        setShowSortBlock(!showSortBlock);
    };

    // показ блока со странами пива
    const [showCountryBlock, setShowCountryBlock] = useState(false);

    const toggleCountryBlock = () => {
        if (showSortBlock) {
            setShowSortBlock(!showSortBlock);
        }
        setShowCountryBlock(!showCountryBlock);
    };

    // показ блока описания товара
    const [showProductBlock, setShowProductBlock] = useState(false);

    const toggleProductBlock = () => {
        setShowProductBlock(!showProductBlock);
        if (!showProductBlock) {
            document.documentElement.style.overflow = 'hidden'; // Запретить прокрутку
          } else {
            document.documentElement.style.overflow = ''; // Разрешить прокрутку
          }
    };

    // показ кнопок для добавления товаров
    const [addProduct, setAddProduct] = useState(false);

    const toggleAddButtons = (e) => {
        e.stopPropagation();
        setAddProduct(!addProduct);
    };

    // параметр для открытия ссылки в без карточки
    const handleClickLink = (e) => {
        e.stopPropagation();
    }

    // функция для филтров пива
    const [selectedButton, setSelectedButton] = useState(1);

    const handleButtonClick = (buttonId) => {

        setSelectedButton(buttonId);

    }

    // показ блока со странами пива
    const [showMenuBlock, setShowMenuBlock] = useState(false);

    const toggleMenuBlock = () => {

        setShowMenuBlock(!showMenuBlock);

    };

    // показ в зависимости от того авторизован пользователь или нет
    const [menuItem, setMenuItem] = useState('Главная');

    let username = ""
    let email = ""
    let password = ""
    let repeated_password = ""
    let phone = ""
    // стили при несовпадении паролей
    let [misMatch, setMisMatch] = useState(false);

    function sign_up_step1() {
        username = document.getElementById("name").value
        email = document.getElementById("login").value
        password = document.getElementById("created_password").value
        repeated_password = document.getElementById("repeated_password").value
        phone = document.getElementById("number").value

        if (password !== repeated_password) {

            setMisMatch(true);
            console.log(username, email, password, repeated_password, phone)

        }

        if (password === repeated_password && username !== "" && email !== "" && phone !== "")  {

            document.getElementById("addressPage").click()
            setMisMatch(false);
            console.log(username, email, password, repeated_password, phone)

        }
    }

    let street = ""
    let house = ""
    // стили при несовпадении паролей
    const [invalidAdress, setInvalidAdress] = useState(false);

    function final_sign_up() {

        street = document.getElementById("street").value
        house = document.getElementById("house").value

        if (street !== "улица Диккенса" || street !== "улица Шекспира" || street !== "улица Киплинга") {

            setInvalidAdress(true)

        }

        if ((house !== "") && (street === "улица Диккенса" || street === "улица Шекспира" || street === "улица Киплинга")) {

            setMenuItem('Профиль');
            setInvalidAdress(false)
            document.getElementById("final_sign_up").click()
            let fullAdress = street + " " + house

            const data = {
                email: email,
                password: password,
                username: username,
                phone: phone,
                address: fullAdress
            };

            console.log(data)

            fetch('https://biermann-api.onixx.ru/api/user/create', {
                method: 'POST',
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
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
        }

    }

    function login() {

        let email = document.getElementById("email").value
        let password = document.getElementById("password").value

        if (email !== "" && password !== "") {

            setMenuItem('Профиль');
            document.getElementById("login").click()

            const data = {
                username: email,
                password: password
            };

            console.log(data)

            fetch('https://biermann-api.onixx.ru/api/user/token', {
                method: 'POST',
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
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                });
        }

    }


    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Beer images={images} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} showRecoloredButton = {selectedButton} onReColour = {handleButtonClick} onLink = {handleClickLink} showAddButtons={addProduct} onShowAddButtons={toggleAddButtons} onShowProduct = {toggleProductBlock} onShowCountry = {toggleCountryBlock} showCountryBlock = {showCountryBlock} onShowSorts={toggleSortBlock} showSortBlock={showSortBlock} currentItem={menuItem} />} />
                    <Route path="/login" element={<Login onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} login={login} />} />
                    <Route path="/signup" element={<SignUp misMatch = {misMatch} sign_up_step1 = {sign_up_step1} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} />} />
                    <Route path="/address" element={<AdressForm invalidAdress = {invalidAdress} final_sign_up = {final_sign_up} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem}/>} />
                    <Route path="/profile" element={<Profile onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} />} />
                    <Route path="/cart" element={<Cart currentItem={menuItem} />} />
                </Routes>
            </HashRouter>
            {showProductBlock &&
                <Product onShowProduct = {toggleProductBlock}/>
            }
        </div>
    )
}

export default App;