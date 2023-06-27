import React from 'react';

function PopupWithForm({ name, title, isOpen, onClose, submitText, children, onSubmit, useEscapePress }) {

    function handleClickOverlay(evt) {
        evt.stopPropagation();
    }
    // навешиваем обработчик по нажитию Esc
    useEscapePress(onClose, isOpen);

    return (
        <div className={`popup popup_${name} ${isOpen && "popup_opened"}`} onClick={onClose}>
            <form className={`popup__form popup__${name}`} name={`${name}-form`} onClick={handleClickOverlay} onSubmit={onSubmit} noValidate>
                <fieldset className="popup__fieldset">
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button className={`popup__save-btn popup__save-btn_${name}`} type="submit">{submitText}</button>
                </fieldset>
                <button className="popup__close-btn" type="button" onClick={onClose}></button>
            </form>
        </div>
    )
}

export { PopupWithForm }