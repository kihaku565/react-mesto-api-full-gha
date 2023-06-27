import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ handleRegister }) {

    const [registerData, setRegisterData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = registerData;

    function handleChange(evt) {
        const { name, value } = evt.target;
        setRegisterData({
            ...registerData,
            [name]: value
        })
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        handleRegister(registerData)
    }

    return (
        <div className="register page__register">
            <form name="form_register" className="register__form" onSubmit={handleSubmit}>
                <fieldset className="register__fieldset">
                    <h2 className="register__title">Регистрация</h2>
                    <label className="register__label">
                        <input
                            className="register__input"
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={handleChange} />
                    </label>
                    <label className="register__label">
                        <input
                            className="register__input"
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            autoComplete="off" />
                    </label>
                    <button type="submit" className="register__button">Зарегистрироваться</button>
                    <Link to="/sign-in" className="register__link">Уже зарегистрированы? Войти</Link>
                </fieldset>
            </form>
        </div>
    )
}

export { Register }