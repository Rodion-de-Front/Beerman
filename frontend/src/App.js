import Login from "./components/Login/Login";
import Beer from "./components/Beer/Beer";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import  { HashRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react';

function App() {

    const [menuItem, setMenuItem] = useState('Главная');

    const handleLogin = () => {
      setMenuItem('Профиль');
    };

    return (
        <div>
            <HashRouter>
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Beer currentItem={menuItem} />} />
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