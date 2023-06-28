const BASE_URL = "https://api.mesto.matyushkin.nomoreparties.sbs";

const onError = res => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
        .then(onError)
}

const login = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            password: password,
            email: email
        })
    })
        .then(onError)
}

const checkToken = jwt => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${jwt}`
        }
    })
        .then(onError)
}

export { register, login, checkToken }