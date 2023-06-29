import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from "react-router-dom";
import logo from "../images/header-logo.svg";
import { useMediaQuery } from 'react-responsive';

function Header({ loggedIn, email, onSignOut }) {

    const [isMenuOpened, setIsMenuOpened] = useState(false);

    function handleClickBurger() {
        setIsMenuOpened(!isMenuOpened);
    }

    const isMobile = useMediaQuery({ query: `(max-width: 500px)` });

    useEffect(() => {
        if (isMobile) {
            setIsMenuOpened(true);
        } else {
            setIsMenuOpened(false);
        }
    }, [isMobile])

    return (
        <header className="header">
            <Link to="/" className="header__logo-link">
                <img className="header__logo" src={logo} alt="логотип Mesto" />
            </Link>
            {loggedIn ? (
                <>
                    {
                        (!isMenuOpened) && (
                            <div className="header__info">
                                <p className="header__email">{email}</p>
                                <button className="header__button" onClick={onSignOut}>Выйти</button>
                            </div>
                        )
                    }
                    <button className={isMenuOpened ? 'header__burger-button' : 'header__burger-close'} onClick={handleClickBurger}></button>
                </>
            ) : (
                <Routes>
                    <Route path="/sign-in"
                        element={
                            <Link to="/sign-up"
                                className="header__link">
                                Регистрация
                            </Link>
                        }
                    />
                    <Route path="/sign-up"
                        element={
                            <Link to="/sign-in"
                                className="header__link">
                                Войти
                            </Link>
                        }
                    />
                </Routes>
            )}
        </header>
    )
}
export { Header }