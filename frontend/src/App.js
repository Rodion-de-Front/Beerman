import Login from "./components/Login/Login";
import Delivery from "./components/Delivery/Delivery";
import Beer from "./components/Beer/Beer";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import Product from "./components/Product/Product";
import Cart from "./components/Cart/Cart";
import AdressForm from "./components/AdressForm/AdressForm";
import  { HashRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';

function App() {

    // показ в зависимости от того авторизован пользователь или нет
    const [menuItem, setMenuItem] = useState('Главная');

    useEffect(()=>{
        if (localStorage.getItem("token") !== null) {
            setMenuItem('Профиль');
        } else {
            setMenuItem('Главная');
        }
    }, [])

    const [beforeSecondSpace, setBeforeSecondSpace] = useState('');
    const [afterSecondSpace, setAfterSecondSpace] = useState('');
    const [profileName, setProfileName] = useState('');

    useEffect(() => {
        fetch("https://biermann-api.onixx.ru/api/user/profile", {
            method: "GET",
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem("token")
            },
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);

            // Разделяем строку по пробелам
            var myString = data.address;
            var words = myString.split(' ');

            // Если второго пробела нет, массив будет содержать только один элемент
            var beforeSecondSpace = words.slice(0)[0] + " " + words.slice(0)[1]
            setBeforeSecondSpace(beforeSecondSpace);

            // Берем все элементы после второго пробела и объединяем их обратно в строку
            var afterSecondSpace = words.slice(2).join('') || '';
            setAfterSecondSpace(afterSecondSpace);

            console.log("До второго пробела:", beforeSecondSpace);
            console.log("После второго пробела:", afterSecondSpace);

            setProfileName(data.username)

        })
        .catch((error) => {
            console.log(error);
            localStorage.removeItem("token");
            setMenuItem('Главная');
        });
    }, []);


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

    // параметр для открытия ссылки в без карточки
    const handleClickLink = (e) => {
        e.stopPropagation();
    }

    // функция для филтров пива
    const [selectedButton, setSelectedButton] = useState(1);

    const handleButtonClick = (buttonId) => {

        setSelectedButton(buttonId);

    }

    // функция для филтров закусок
    const [selectedSnackButton, setSelectedSnackButton] = useState(0);

    const handleSnackButtonClick = (buttonId) => {

        setSelectedSnackButton(buttonId);

    }

    // показ блока со странами пива
    const [showMenuBlock, setShowMenuBlock] = useState(false);

    const toggleMenuBlock = () => {

        setShowMenuBlock(!showMenuBlock);

    };

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

    const [alreadyExiste, setAlreadyExiste] = useState(false);

    function final_sign_up() {

        street = document.getElementById("street").value
        house = document.getElementById("house").value

        if (street !== "улица Диккенса" && street !== "улица Шекспира" && street !== "улица Киплинга") {

            setInvalidAdress(true)

        }

        if ((house !== "") && (street === "улица Диккенса" || street === "улица Шекспира" || street === "улица Киплинга")) {

            setInvalidAdress(false)

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
                    setMenuItem('Профиль');
                    setInvalidAdress(false)
                    document.getElementById("final_sign_up").click()
                    localStorage.setItem("token", responseData.access_token)
                    window.location.reload()
                })
                .catch(error => {
                    console.error('Ошибка:', error);
                    setAlreadyExiste(true)
                });
        }

    }

    // стили при несовпадении паролей
    let [noExistence, setNoExistence] = useState(false);

    function login() {

        let email = document.getElementById("email").value
        let password = document.getElementById("password").value

        if (email !== "" && password !== "") {

            const data = {
                username: email,
                password: password
            };

            console.log(data)

            var formBody = [];
            for (var property in data) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(data[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");

            fetch('https://biermann-api.onixx.ru/api/user/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            },
            body: formBody
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
                localStorage.setItem("token", responseData.access_token)
                setMenuItem('Профиль');
                document.getElementById("login").click()
                setNoExistence(false)
                window.location.reload()
            })
            .catch(error => {
                console.error('Ошибка:', error);
                setNoExistence(true)
            });
        }

    }

    const [update, setUpdate] = useState(false);

    function updateUser() {

    if (document.getElementById("created_password").value !== document.getElementById("repeated_password").value) {
        setMisMatch(true)
        return
    }

    let newAddress = document.getElementById("profile-street").value + " " + document.getElementById("profile-house").value

    // Пример данных, которые вы хотите отправить
    const requestData = {
        email: document.getElementById("login").value,
        password: document.getElementById("created_password").value,
        username: document.getElementById("name").value,
        phone: document.getElementById("number").value,
        address: newAddress,
    };

    console.log(requestData)

    fetch("https://biermann-api.onixx.ru/api/user/update", {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
        },
        body: JSON.stringify(requestData),
      })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        setUpdate(true)
      })
      .catch((error) => {
        console.error('Error:', error);
        // Обработка ошибки, если необходимо
      });

    }

    return (
        <div>
            <HashRouter>
                <Routes>
                    <Route path="/" element={<Beer profileName = {profileName} images={images} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} showRecoloredButton = {selectedButton} onReColour = {handleButtonClick} onLink = {handleClickLink}  onShowProduct = {toggleProductBlock} onShowCountry = {toggleCountryBlock} showCountryBlock = {showCountryBlock} onShowSorts={toggleSortBlock} showSortBlock={showSortBlock} currentItem={menuItem} onClickSnackButton = {handleSnackButtonClick} selectedSnackButton = {selectedSnackButton} />} />
                    <Route path="/login" element={<Login noExistence = {noExistence} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} login={login} />} />
                    <Route path="/signup" element={<SignUp setAlreadyExiste = {setAlreadyExiste} misMatch = {misMatch} sign_up_step1 = {sign_up_step1} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} />} />
                    <Route path="/address" element={<AdressForm setInvalidAdress = {setInvalidAdress} alreadyExiste = {alreadyExiste} invalidAdress = {invalidAdress} final_sign_up = {final_sign_up} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem}/>} />
                    <Route path="/profile" element={<Profile profileName = {profileName} misMatch = {misMatch} update = {update} updateUser = {updateUser} trimedHouse = {afterSecondSpace} trimedStreet = {beforeSecondSpace}  onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} />} />
                    <Route path="/delivery" element={<Delivery profileName={profileName} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} />} />
                    <Route path="/cart" element={<Cart invalidAdress = {invalidAdress} profileName={profileName} afterSecondSpace = {afterSecondSpace} beforeSecondSpace = {beforeSecondSpace} onShowMenuBlock = {toggleMenuBlock} showMenuBlock = {showMenuBlock} currentItem={menuItem} />} />
                </Routes>
            </HashRouter>
            {showProductBlock &&
                <Product onLink = {handleClickLink} onShowProduct = {toggleProductBlock}/>
            }
        </div>
    )
}

export default App;