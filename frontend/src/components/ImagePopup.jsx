import React from 'react';

function ImagePopup({ card, isOpen, onClose, useEscapePress }) {

    function handleClickOverlay(e) {
        e.stopPropagation();
    }
    // навешиваем обработчик по нажитию Esc
    useEscapePress(onClose, isOpen)

    return (
        <div className={`popup popup_view-img ${isOpen && "popup_opened"}`} onClick={onClose}>
            <div className="popup__container-img" onClick={handleClickOverlay}>
                <img className="popup__img" src={card.link} alt={card.name} />
                <button className="popup__close-btn" type="button" onClick={onClose}></button>
                <h2 className="popup__title-img">{card.name}</h2>
            </div>
        </div>
    )
}

export { ImagePopup }