import React, { useRef, useEffect } from 'react';
import { PopupWithForm } from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, useEscapePress }) {

    const inputRef = useRef(); // записываем объект, возвращаемый хуком, в переменную

    // После загрузки текущего пользователя из API 
    //его данные будут использованы в управляемых компонентах.
    useEffect(() => {
        inputRef.current.value = ''
    }, [isOpen])

    function handleSubmit(evt) {
        // Запрещаем браузеру переходить по адресу формы
        evt.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }

    return (
        <PopupWithForm
            name="change-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            submitText="Сохранить"
            useEscapePress={useEscapePress}>
            <label className="popup__label">
                <input
                    className="popup__input-text"
                    name="link"
                    type="url"
                    id="avatar-link"
                    placeholder="Ссылка на картинку"
                    ref={inputRef}
                    required />
                <span className="image-link-input-error popup__input-error"></span>
            </label>
        </PopupWithForm>
    )
}

export { EditAvatarPopup }