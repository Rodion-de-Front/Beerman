import FullForm from '../FullForm/FullForm';
import Navbar from '../Navbar/Navbar';
import './Profile.css';

function Profile( {currentItem} ) {
    return (
        <div className="profile">
            <Navbar currentItem={currentItem} />
            <div className="profile-form">
                <div className="form-title">Профиль</div>
                <FullForm />
                <button className="save-btn">Сохранить</button>
            </div>
        </div>
    );
}

export default Profile