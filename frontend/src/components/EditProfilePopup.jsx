
import React, { useState, useContext, useEffect } from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext';
import { PopupWithForm } from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, useEscapePress }) {

    const currentUser = useContext(currentUserContext); // Подписка на контекст
    const [userData, setUserData] = useState({
        name: '',
        about: ''
    });
    const { name, about } = userData;

    // После загрузки текущего пользователя из API 
    //его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        setUserData(currentUser);
    }, [currentUser, isOpen])

    function handleChange(evt) {
        const { name, value } = evt.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();
        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser(userData);
    }

    return (
        <PopupWithForm
            name="edit-profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            useEscapePress={useEscapePress}
            submitText="Сохранить">
            <label className="popup__label">
                <input
                    className="popup__input-text"
                    name="name"
                    type="text"
                    id="profile-name"
                    value={name || ''}
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange}
                    required />
                <span className="profile-name-input-error popup__input-error"></span>
            </label>
            <label className="popup__label">
                <input
                    className="popup__input-text"
                    name="info"
                    type="text"
                    id="profile-about"
                    value={about || ''}
                    minLength="2"
                    maxLength="40"
                    onChange={handleChange}
                    required />
                <span className="profile-about-input-error popup__input-error"></span>
            </label>
        </PopupWithForm >
    )
}

export { EditProfilePopup }