import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { currentUserContext } from '../contexts/CurrentUserContext';
import { Header } from './Header';
import { Main } from './Main';
import { Footer } from './Footer';
import { EditProfilePopup } from './EditProfilePopup';
import { AddPlacePopup } from './AddPlacePopup';
import { EditAvatarPopup } from './EditAvatarPopup';
import { DeleteCardPopup } from './DeleteCardPopup';
import { ImagePopup } from "./ImagePopup";
import { api } from '../utils/Api';
import avatar from '../images/profile-avatar.jpg';
import { Login } from './Login.jsx';
import { Register } from './Register.jsx';
import { InfoTooltip } from './InfoTooltip.jsx';
import { ProtectedRoute } from './ProtectedRoute.jsx';
import * as auth from '../utils/Auth';


function App() {
    const navigate = useNavigate();
    // Стейты:
    // открытие попапа редактирования профиля
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    // открытития попапа добавления карточек
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    // открытие попапа смены аватара
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    // открытие попап карточки на весь экран
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    // открытие попапа удаления карточки
    const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
    // данные карточки на полный экран
    const [selectedCard, setSelectedCard] = useState({});
    // данные для удалённой карточки
    const [cardDelete, isCardDelete] = useState({});
    // данные пользователя
    const [currentUser, setCurrentUser] = useState({
        name: 'Имя пользователя',
        about: 'О пользователе',
        avatar: avatar
    });
    // карточки
    const [cards, setCards] = useState([]);
    // успех/неудача
    const [infoTooltipShow, setInfoTooltipShow] = useState({
        isOpen: false,
        successful: false
    });
    // сообщение об успешной регистрации
    const [message, setMessage] = useState('');
    // стейты для входа
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');

    // Проверка токена и авторизация пользователя
    useEffect(() => {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            auth.checkToken(jwt)
                .then(data => {
                    if (data) {
                        setEmail(data.data.email);
                        setLoggedIn(true);
                        navigate('/');
                    }
                })
                .catch(err => console.log(err))
        }
    }, [navigate]);

    // Если залогинены - получаем карточки и информацию о пользователе
    useEffect(() => {
        if (loggedIn) {
            api.renderUserAndCards()
                .then(([dataUserInfo, dataCards]) => {
                    setCurrentUser(dataUserInfo);
                    setCards(dataCards);
                })
                .catch((err) => console.log(err))
        }
    }, [loggedIn])

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setEditAvatarPopupOpen(false);
        setImagePopupOpen(false)
        setDeleteCardPopupOpen(false);
        setInfoTooltipShow({
            isOpen: false,
            successful: false
        })
    }

    // Функция открытия на полный экран картинки
    function handleCardClick(data) {
        setImagePopupOpen(true);
        setSelectedCard(data);
    }

    // Функция слушатель на клик по корзинке, чтобы открыть попап
    function handleDeleteCardClick(data) {
        isCardDelete(data)
        setDeleteCardPopupOpen(true);
    }

    // Ф-ция управляет удалением карточки
    function handleDeleteCard() {
        api.deleteCard(cardDelete)
            .then(() => {
                setCards((state) => state.filter(item => item._id !== cardDelete._id))
            })
            .then(() => closeAllPopups())
            .catch(err => console.log(err))
    }

    // Функция постановки и снятия лайка
    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            api.setLike(card)
                .then(newCard => {
                    setCards(state => state.map(c => c._id === card._id ? newCard : c))
                })
                .catch(err => console.log(err))
        } else {
            api.deleteLike(card)
                .then(newCard => {
                    setCards(state => state.map(c => c._id === card._id ? newCard : c))
                })
                .catch(err => console.log(err))
        }
    }

    // Отправка данных пользователя на сервер
    function handleUpdateUser(info) {
        api.setUserInfo(info)
            .then((newInfo) => { setCurrentUser(newInfo) })
            .then(() => { closeAllPopups() })
            .catch(err => console.log(err))
    }

    // Отправка аватара пользователя на сервер
    function handleUpdateAvatar(input) {
        api.setUserAvatar(input)
            .then((newInfo) => { setCurrentUser(newInfo) })
            .then(() => { closeAllPopups() })
            .catch(err => console.log(err))
    }

    // Отправка новой карточки и обновление стейта
    function handleAddPlace(data) {
        api.addCard(data)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch(err => console.log(err))
    }

    function useEscapePress(callback, dependency) {
        useEffect(() => {
            if (dependency) {
                const onEscClose = evt => {
                    if (evt.key === 'Escape') {
                        callback()
                    }
                }
                document.addEventListener('keyup', onEscClose);
                return () => { // При размонтировании удалим обработчик данным колбэком
                    document.removeEventListener('keyup', onEscClose)
                };
            }
        }, [dependency])
    }

    function handleInfoTooltip(res) {
        setInfoTooltipShow({
            isOpen: true,
            successful: res
        })
    }

    // Регистрация пользователя
    function handleRegister({ email, password }) {
        auth.register(email, password)
            .then(() => {
                handleInfoTooltip(true);
                setMessage("Вы успешно зарегистрировались!");
                navigate('/sign-in');
            })
            .catch(err => {
                handleInfoTooltip(false);
                setMessage("Что-то пошло не так! Попробуйте еще раз.");
                console.log(err)
            });
    }

    // Вход
    function handleLogin({ email, password }) {
        auth.login(email, password)
            .then((jwt) => {
                if (jwt.token) {
                    setEmail(email);
                    setLoggedIn(true);
                    localStorage.setItem('jwt', jwt.token);
                    navigate('/');
                }
            })
            .catch(err => {
                handleInfoTooltip(false);
                setMessage("Что-то пошло не так! Попробуйте еще раз.");
                console.log(err);
            })
    }

    // Выход
    const handleSignOut = () => {
        localStorage.removeItem('jwt');
        setEmail('');
        setLoggedIn(false);
        navigate('/sign-in');
    }

    return (
        <currentUserContext.Provider value={currentUser}>

            <Header
                loggedIn={loggedIn}
                email={email}
                onSignOut={handleSignOut} />

            <Routes>
                <Route path="/"
                    element={
                        <ProtectedRoute
                            component={Main}
                            loggedIn={loggedIn}
                            cards={cards}
                            onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onCardClick={handleCardClick}
                            onCardDelete={handleDeleteCardClick}
                            onCardLike={handleCardLike}
                        />
                    }
                />

                <Route path="/sign-in"
                    element={
                        <Login
                            onLogin={handleLogin}
                        />
                    }
                />

                <Route path="/sign-up"
                    element={
                        <Register
                            handleRegister={handleRegister}
                        />
                    }
                />
            </Routes>

            <Footer />

            <InfoTooltip
                onClose={closeAllPopups}
                status={infoTooltipShow}
                title={message} />

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                useEscapePress={useEscapePress} />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlace}
                useEscapePress={useEscapePress} />

            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                useEscapePress={useEscapePress} />

            <DeleteCardPopup
                isOpen={isDeleteCardPopupOpen}
                onClose={closeAllPopups}
                isAccept={handleDeleteCard}
                useEscapePress={useEscapePress} />

            <ImagePopup
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
                card={selectedCard}
                useEscapePress={useEscapePress} />

        </currentUserContext.Provider >
    );
}

export { App };
