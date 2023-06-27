import React, { useState } from "react";

function Login({ onLogin }) {

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
        });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onLogin(registerData);
    }

    return (
        <div className="register page__register">
            <form name="form_register" className="register__form" onSubmit={handleSubmit}>
                <fieldset className="register__fieldset">
                    <h2 className="register__title">Вход</h2>
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
                            onChange={handleChange} />
                    </label>
                    <button type="submit" className="register__button">Войти</button>
                </fieldset>
            </form>
        </div>
    )
}

export { Login }