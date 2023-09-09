import { memo } from 'react';
import ThemeSwitch from './ThemeSwitch';
import { Routes, Route, Link } from 'react-router-dom';
import BurgerMenu from './BurgerMenu';
import MobileMenu from './MobileMenu';

const Header = ({ email, onSignOut, isOpen, OnBurgerClick }) => {

  return (
    <>
      {isOpen && <MobileMenu isOpen={isOpen} email={email} onSignOut={onSignOut} />}
      <header className="header">
        <div className="header__logo"></div>
        <div className='header__wrapper'>
          <div className='header__profile'>
            {//Пробовал для себя использования хука useLocation не считайте за ошибку
            /* {isLoggedIn ? (
              <>
                <p className='header__email'>{email || ""}</p>
                <Link className="header__link" to="/sign-in" onClick={onSignOut}>
                  Выйти
                </Link>
                <BurgerMenu isOpen={isHamburgerMenu} toggleMenu={toggleMenu} />
              </>
            ) : (
              <Link
                className="header__link"
                to={location === "/sign-in" ? "/sign-up" : "/sign-in"}
              >
                {location === "/sign-in" ? "Регистрация" : "Войти"}
              </Link>
            )}
             */}
            <Routes>
              <Route path="/sign-up" element={
                <Link to="/sign-in" className="header__link">
                  Войти
                </Link>}
              />
              <Route path="/sign-in"
                element={
                  <Link to="/sign-up" className="header__link">
                    Регистрация
                  </Link>
                }
              />
              <Route path="/*" element={
                <>
                  <p className="header__email">{email || ""}</p>
                  <Link
                    className="header__link"
                    onClick={onSignOut}
                  >
                    Выйти
                  </Link>
                  <BurgerMenu isOpen={isOpen} OnBurgerClick={OnBurgerClick} />
                </>
              }
              />
            </Routes>
          </div>
          <ThemeSwitch />
        </div>

      </header >
    </>
  )
}

export default memo(Header)