import React from 'react';
import { PopupWithForm } from "./PopupWithForm";

function DeleteCardPopup({ isOpen, onClose, isAccept, useEscapePress }) {

    function handleDeleteCard(evt) {
        evt.preventDefault();
        isAccept()
    }

    return (
        <PopupWithForm
            name="delete-img"
            title="Вы уверены?"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleDeleteCard}
            submitText="Да"
            useEscapePress={useEscapePress}
        />
    )
}

export { DeleteCardPopup }