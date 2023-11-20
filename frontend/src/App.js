import Login from "./components/Login/Login";
import Beer from "./components/Beer/Beer";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import AdressForm from "./components/AddressForm/AdressForm";
import  { HashRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';

function App() {

    const images = [
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyg4ujypj5_WBONKq-M64Y8hfFEqh2YCenBQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyg4ujypj5_WBONKq-M64Y8hfFEqh2YCenBQ&usqp=CAU',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyg4ujypj5_WBONKq-M64Y8hfFEqh2YCenBQ&usqp=CAU',
        // Добавьте ссылки на свои изображения
    ];

    // показ в зависимости от того авторизован пользователь или нет
    const [menuItem, setMenuItem] = useState('Главная');

    const handleLogin = () => {
      setMenuItem('Профиль');
    };

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


    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Beer images={images} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} showRecoloredButton = {selectedButton} onReColour = {handleButtonClick} onLink = {handleClickLink} showAddButtons={addProduct} onShowAddButtons={toggleAddButtons} onShowProduct = {toggleProductBlock} onShowCountry = {toggleCountryBlock} showCountryBlock = {showCountryBlock} onShowSorts={toggleSortBlock} showSortBlock={showSortBlock} currentItem={menuItem} />} />
                    <Route path="/login" element={<Login onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignUp onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} />} />
                    <Route path="/address" element={<AdressForm onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} onLogin={handleLogin}/>} />
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