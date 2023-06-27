import React, { useContext } from 'react';
import { currentUserContext } from '../contexts/CurrentUserContext'

function Card({ card, onCardClick, onCardDelete, onCardLike }) {

    const currentUser = useContext(currentUserContext); // подписываемся на контекст

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like-btn ${isLiked && 'element__like-btn_active'}`;

    function handleClick() {
        onCardClick(card)
    }

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteCard() {
        onCardDelete(card)
    }

    return (
        <li className="element">
            <img className="element__pic" src={card.link} alt={card.name} onClick={handleClick} />
            {isOwn && (<button className="element__delete" onClick={handleDeleteCard}></button>)}
            <div className="element__caption">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                    <span className="element__like-counter">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export { Card }