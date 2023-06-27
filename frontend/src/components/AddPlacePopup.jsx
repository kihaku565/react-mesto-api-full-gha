import React, { useState, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, useEscapePress }) {

    const [cardData, setCardData] = useState({
        name: '',
        link: ''
    })

    const { name, link } = cardData;

    function handleChange(evt) {
        const { name, value } = evt.target;
        setCardData({
            ...cardData,
            [name]: value
        })
    }

    function handleAddPlaceSubmit(evt) {
        evt.preventDefault();
        onAddPlace(cardData)
    }

    useEffect(() => { // очищаем поля
        setCardData({
            name: '',
            link: ''
        })
    }, [isOpen])

    return (
        <PopupWithForm
            name="add-image"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
            useEscapePress={useEscapePress}
            submitText="Создать">
            <label className="popup__label">
                <input
                    className="popup__input-text"
                    name="name"
                    type="text"
                    id="image-name"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    value={name}
                    onChange={handleChange}
                    required />
                <span className="image-name-input-error popup__input-error"></span>
            </label>
            <label className="popup__label">
                <input
                    className="popup__input-text"
                    name="link"
                    type="url"
                    id="image-link"
                    placeholder="Ссылка на картинку"
                    value={link}
                    onChange={handleChange}
                    required />
                <span className="image-link-input-error popup__input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export { AddPlacePopup }