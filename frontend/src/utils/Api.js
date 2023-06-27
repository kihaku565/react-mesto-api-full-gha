const onError = res => {
    if (res.ok) {
        return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
}

class Api {
    constructor({ baseUrl, headers }) {
        this._url = baseUrl;
        this._headers = headers;
    }

    getUserInfo() { // Загрузка информации о пользователе с сервера
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(onError);
    }

    getInitialCards() { // Загрузка карточек с сервера
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(onError);
    }

    renderUserAndCards() { // если оба промиса зарезолвены - верни массив этих промисов
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    setUserInfo(info) { // Редактирование профиля на сервере
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: info.name,
                about: info.about
            })
        })
            .then(onError);
    }

    addCard(data) { // Добавление новой карточки на сервер
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
            .then(onError);
    }

    deleteCard(data) { // Удаление карточки
        return fetch(`${this._url}/cards/${data._id}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(onError)
    }

    setLike(data) { // Постановка и снятие лайка
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'PUT',
            headers: this._headers
        })
            .then(onError)
    }

    deleteLike(data) {
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(onError)
    }

    setUserAvatar(input) { // Обновление аватара пользователя
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: input.avatar
            })
        })
            .then(onError)
    }
}

const settingUserApi = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
    headers: {
        authorization: '289bb7e8-7dbc-4f85-89cd-2ceeadf444c4', 'Content-Type': 'application/json'
    }
}

const api = new Api(settingUserApi) // создаём экземляр класса работающего с API сервера

export { api }