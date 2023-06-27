import './index.css';
import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js'
import { UserInfo } from '../components/UserInfo.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidator } from '../components/FormValidator.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithConfirmation } from '../components/PopupWithConfirmation.js';
import {
  btnEditProfile,
  btnСhangeAvatar,
  btnAddImage,
  userPath,
  cardsPath,
  formValidators,
  config,
  settingUserApi
} from '../components/constants.js';

const api = new Api(settingUserApi); // создаём экземляр класса работающего с API сервера

api.renderUserAndCards() // рендерим данные с сервера в mesto
  .then(([user, data]) => {
    userInfo.setUserInfo({
      name: user.name,
      info: user.info, // ********** бля надо вот эту строчку проверить
      avatar: user.avatar
    });
    cardList.renderCards({
      cards: data,
      userId: user._id,
      insertMethod: 'append'
    })
  })
  .catch(err => console.log(err));  // в случае реджекта верни ошибку

const popupOpenImage = new PopupWithImage('.popup_view-img') // создаём экземпляр класса с открытой картинкой
popupOpenImage.setEventListeners();

const handleCardClick = data => popupOpenImage.open(data); // объявляем функцию, которая записываем значения в элементы попапа

const cardList = new Section({ // вставляем массив карточек в разметку
  renderer: data => {
    cardList.addItem(createNewCard(data.card, data.userId), data.insertMethod)
  }
}, '.elements__list');

// создаём экземпляр класса отвечающий за попап удаления карточки
const popupDeleteCard = new PopupWithConfirmation('.popup_delete-img',
cardData => {
  deleteCardsButton.textContent = 'Удаление...';
  api.deleteCard(cardData.data)
  .then(() => {
    cardData.element.remove();
    cardData.element = null;
    popupDeleteCard.close();
  })
  .catch(err => console.log(err))
  .finally(() => deleteCardsButton.textContent = 'Да')
})

popupDeleteCard.setEventListeners();

// создаём экземпляр класса отвечающий за попап добавления карточек
const popupAddCard = new PopupWithForm('.popup__form_add', (data, submitButton) => {
  submitButton.textContent = 'Создание...';
  api.addCard(data)
  .then(card => {
    cardList.addItem(createNewCard(card));
    popupAddCard.close(); // закрываем попап после сабмита
  })
  .catch(err => console.log(err))
  .finally(() => {
    submitButton.textContent = 'Создать'
  })
})

popupAddCard.setEventListeners();

// создаём экземпляр класса отвечающий за попап редактирования аватара
const popupEditAvatar = new PopupWithForm('.popup_change-avatar', (data, submitButton) => {
  submitButton.textContent = 'Сохранить...';
  api.setUserAvatar(data)
  .then(data => {
    profileAvatar.src = `url${data.avatar}`;
    popupEditAvatar.close(); // закрываем попап после сабмита
  })
  .catch(err => console.log(err))
  .finally(() => {
    submitButton.textContent = 'Сохранить'
  })
})

popupEditAvatar.setEventListeners();

const createNewCard = (data, userId) => {
  const newCard = new Card(data, '#element-template', handleCardClick, handleLikeSet, handleLikeDelete, handleCardDelete, userId);
  return newCard.createCard();
}

const handleCardDelete = element => popupDeleteCard.open(element);

const handleLikeSet = (cardData, evt) => { // колбэк для отправки лайка на сервер
  api.setLike(cardData.data)
  .then(res => {
    cardData.counterLikes.textContent = res.likes.length;
    evt.target.classList.add('.element__like-btn_active');
  })
  .catch(err => console.log(err))
}

// экземпляр класса, работающего с профилем пользователя
const userInfo = new UserInfo({
  selectorName: '.profile__name',
  selectorInfo: '.profile__about',
  selectorAvatar: '.profile__avatar-image'
});

const popupEditProfile = new PopupWithForm('.popup_edit-profile', (data, submitButton) => {
  submitButton.textContent = 'Сохранение...';
  api.setUserInfo(data)
  .then(data => {userInfo.setUserInfo(data)})
  .then(() => popupEditProfile.close())
  .catch(err => console.log(err))
  .finally(() => submitButton.textContent = 'Сохранить')
})

popupEditProfile.setEventListeners();

const formValidators = {}; // объекты для валидации, первоначально - пустой массив. В него будем записывать нужные формы

// Включение валидации
const enableValidators = config => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))
  formList.forEach(formElement => { //проходимся по всем формам
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name'); // получаем данные из атрибута `name` у формы

    formValidators[formName] = validator; // вот тут в объект записываем под именем формы
    validator.enableValidation();
  })
}

enableValidators(config);

addButton.addEventListener('click', () => { // обработчик клика по кнопке (+)
  popupAddCard.open(); // открываем попап
  formValidators[formElementCreateCards.getAttribute('name')].resetValidation(); // убираем ошибки при открытии
})

editButton.addEventListener('click', () => { //обработчик клика по кнопке "редактировать профиль"
  const profileInfo = userInfo.getUserInfo();
  nameInput.value = profileInfo.name;
  jobInput.value = profileInfo.about;
  formValidators[formElementEditProfile.getAttribute('name')].resetValidation(); // убираем ошибки при открытии
  popupEditProfile.open();
})

profileAvatar.addEventListener('click', () => { //обработчик клика по аватару
  formValidators[formElementAvatar.getAttribute('name')].resetValidation(); // убираем ошибки при открытии
  popupEditAvatar.open();
})