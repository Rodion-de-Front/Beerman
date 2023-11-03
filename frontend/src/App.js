import Login from "./components/Login/Login";
import Beer from "./components/Beer/Beer";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import  { HashRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react';

function App() {

    // показ в зависимости от того авторизован пользователь или нет
    const [menuItem, setMenuItem] = useState('Главная');

    const handleLogin = () => {
      setMenuItem('Профиль');
    };

    // показ блока с сортами пива
    const [showSortBlock, setShowSortBlock] = useState(false);

    const toggleSortBlock = () => {
        setShowSortBlock(!showSortBlock);
    };

    // показ блока со странами пива
    const [showCountryBlock, setShowCountryBlock] = useState(false);

    const toggleCountryBlock = () => {
        setShowCountryBlock(!showCountryBlock);
    };


    return (
        <div>
            <HashRouter>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Beer onShowSorts={toggleSortBlock} showSortBlock={showSortBlock} currentItem={menuItem} />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/signup" element={<SignUp onLogin={handleLogin} />} />
                        <Route path="/profile" element={<Profile currentItem={menuItem} />} />
                    </Routes>
                </div>
            </HashRouter>
        </div>
    )
}

export default App;