import React, { useContext } from 'react';
import { Card } from './Card';
import { currentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardDelete, onCardLike }) {

    const currentUser = useContext(currentUserContext); // Подписываемся на контекст

    return (
        <main className="main">
            <section className="profile">
                <div className="profile__avatar" onClick={onEditAvatar}>
                    <img className="profile__avatar-image" src={currentUser.avatar} alt="фото профиля" />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-btn" type="button" onClick={onEditProfile}></button>
                    <p className="profile__about">{currentUser.about}</p>
                </div>
                <button className="profile__add-btn" type="button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map(card => {
                        return (
                            <Card key={card._id}
                                card={card}
                                onCardDelete={onCardDelete}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike} />
                        );
                    })}
                </ul>
            </section>
        </main>
    )
}

export { Main }