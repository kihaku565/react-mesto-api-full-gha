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

    _getHeaders() {
        const jwt = localStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${jwt}`,
            ...this._headers,
        };
    }

    getUserInfo() { // Загрузка информации о пользователе с сервера
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._getHeaders()
        })
            .then(onError);
    }

    getInitialCards() { // Загрузка карточек с сервера
        return fetch(`${this._url}/cards`, {
            method: 'GET',
            headers: this._getHeaders()
        })
            .then(onError);
    }

    renderUserAndCards() { // если оба промиса зарезолвены - верни массив этих промисов
        return Promise.all([this.getUserInfo(), this.getInitialCards()])
    }

    setUserInfo(info) { // Редактирование профиля на сервере
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
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
            headers: this._getHeaders(),
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
            headers: this._getHeaders()
        })
            .then(onError)
    }

    setLike(data) { // Постановка и снятие лайка
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'PUT',
            headers: this._getHeaders()
        })
            .then(onError)
    }

    deleteLike(data) {
        return fetch(`${this._url}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: this._getHeaders()
        })
            .then(onError)
    }

    setUserAvatar(input) { // Обновление аватара пользователя
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: input.avatar
            })
        })
            .then(onError)
    }
}

const api = new Api({ // создаём экземляр класса работающего с API сервера
    baseUrl: 'https://api.mesto.matyushkin.nomoreparties.sbs',
    headers: {
        'Content-Type': 'application/json'
    }
});

export { api }