import React from 'react';

function InfoTooltip({ onClose, status: { isOpen, successful }, title }) {

    function handleClickOverlay(evt) {
        evt.stopPropagation();
    }

    return (
        <div id="popup-info-tooltip" className={`popup ${isOpen && 'popup_opened'}`} onClick={onClose}>
            <div className="popup__container" onClick={handleClickOverlay}>
                <div className={`popup__status ${successful ? 'popup__status_success' : 'popup__status_fail'}`}></div>
                <h2 className="popup__title popup__title_center">{title}</h2>
                <button type="button" className="popup__close-btn" onClick={onClose}></button>
            </div>
        </div>
    );
}

export { InfoTooltip }