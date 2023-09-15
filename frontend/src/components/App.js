import { useState, useCallback, useEffect, useRef } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from '../utils/api';
import * as auth from '../utils/authApi'
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import RemoveCardPopup from "./RemoveCardPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProdectedRoute";

const App = () => {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const [isHamburgerMenu, setIsHamburgerMenu] = useState(false);

  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cardRemove, setCardRemove] = useState({});
  const navigate = useNavigate();
  const timer = useRef();
  const [cards, setCards] = useState([]);
  const [isPreloading, setIsPreloading] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem("jwt")));
  const [email, setEmail] = useState("")

  useEffect(() => {
    setIsPreloading(true)
    isLoggedIn && Promise.all([api.getUserInfoProfile(), api.getInitialsCards()])
      .then(([data, cards]) => {
        setCurrentUser(data)
        setCards(cards)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setIsPreloading(false)
      })

  }, [isLoggedIn])

  const handleToggleMenu = () => {
    setIsHamburgerMenu(!isHamburgerMenu);
  }

  const handleEditProfileClick = useCallback(() => {
    setEditProfilePopupOpen(true);
  }, [])

  const handleAddPlaceClick = useCallback(() => {
    setAddPlacePopupOpen(true);
  }, [])

  const handleEditAvatarClick = useCallback(() => {
    setEditAvatarPopupOpen(true);
  }, [])

  const handleCardClick = useCallback((card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }, [])

  const handleDeleteCardClick = useCallback((card) => {
    setIsDeleteCardPopupOpen(true);
    setCardRemove(card)
  }, [])

  const handleNavigateClose = useCallback((isTooltipPopup) => {
    timer.current = setTimeout(() => {
      if (!isTooltipPopup) {
        navigate('/')
      }
      clearTimeout(timer.current)
    }, 300)
  }, [navigate])



  const closeAllPopups = useCallback((isTooltipPopup) => {
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
    setSelectedCard({})
    handleNavigateClose(isTooltipPopup);
  }, [handleNavigateClose])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeAllPopups()
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeAllPopups]);


  const handleOverlayClose = (e) => {
    if (e.target.classList.contains('popup')) {
      closeAllPopups();
    }
  }

  const handleCardLike = useCallback((card) => {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.changeLike(card._id, isLiked)

      .then((newCard) => {
        console.log('currentUser', isLiked);
        setCards(cards => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err)
      })
  }, [currentUser._id])

  const handleCardDelete = useCallback(() => {
    setIsPreloading(true)
    api.deleteCard(cardRemove._id)
      .then(() => {
        setCards((cards) =>
          cards.filter((c) => c._id !== cardRemove._id)
        )
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => setIsPreloading(false))
  }, [cardRemove._id, closeAllPopups])

  const handleUpdateUser = (data) => {
    setIsPreloading(true)
    api.setUserInfoProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloading(false)
      )
  }

  const handleUpdateAvatar = (avatar) => {
    setIsPreloading(true)
    api.setUserAvatarProfile(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloading(false))
  }
  const handleAddPlaceSubmit = (card) => {
    setIsPreloading(true)
    api.addNewCard(card)
      .then((card) => {
        setCards([card, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPreloading(false))
  }

  const onRegister = (email, password) => {
    auth
      .register(email, password)
      .then((data) => {
        if (data) {
          setRegistrationStatus('success');
          setIsInfoTooltipPopupOpen(true);
          navigate('/sign-in')
        }
      })
      .catch((err) => {
        setRegistrationStatus('error');
        setIsInfoTooltipPopupOpen(true);
        console.log(err);
      });
  }

  const onLogin = (email, password) => {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        setEmail(email);
        navigate('/')
      })
      .catch((err) => {
        setRegistrationStatus('error');
        setIsInfoTooltipPopupOpen(false);
        if (err.status === 400) {
          return console.log("не передано одно из полей");
        } else if (err.status === 401) {
          return console.log("пользователь с email не найден");
        }
        return console.log(err.status);
      });
  }

  const onSignOut = useCallback(() => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setEmail("");
    setIsHamburgerMenu(false)
    navigate('/sign-in');
  }, [navigate])

  const handleTokenCheck = useCallback(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setEmail(data.email);
            setIsLoggedIn(true)
          }
        })
        .catch((err) => {
          console.log(err.status);
          if (err.status === 401) {
            onSignOut()
            return console.log("Переданный токен некорректен ");
          } else if (!jwt) {
            return console.log("Токен не передан или передан не в том формате");
          }
          return console.log("error 500");
        });
    }

  }, [onSignOut]);

  useEffect(() => {
    handleTokenCheck();
  }, [handleTokenCheck]);



  return (
    <div className="page">
      <div className="page__container">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            email={email}
            onSignOut={onSignOut}
            isOpen={isHamburgerMenu}
            OnBurgerClick={handleToggleMenu}
          />
          <Routes>

            <Route path="/sign-up" element={
              <Register
                onRegister={onRegister}
              />
            } />
            <Route path="/sign-in" element={
              <Login
                onLogin={onLogin}
              />
            } />
            <Route path="*" element={
              <Navigate
                to="/"
              />
            }
            />
            <Route path='/' element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                cards={cards}
                isPreloading={isPreloading}
                onCardLike={handleCardLike}
                onCardDelete={handleDeleteCardClick}
              />
            } >
              <Route path="popupEdit" element={
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  isPreloading={isPreloading}
                  onOverlayClose={handleOverlayClose}
                />}
              />
              <Route path="popupAvatar" element={
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  isPreloading={isPreloading}
                  onOverlayClose={handleOverlayClose} />
              } />
              <Route path="popupCard" element={
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                  isPreloading={isPreloading}
                  onOverlayClose={handleOverlayClose} />
              } />
              <Route path="cards/:id" element={
                <ImagePopup
                  cards={cards}
                  card={selectedCard}
                  isOpen={isImagePopupOpen}
                  onClose={closeAllPopups}
                  onOverlayClose={handleOverlayClose} />
              } />
              <Route path="cards/popupDelete" element={
                <RemoveCardPopup
                  isOpen={isDeleteCardPopupOpen}
                  onClose={closeAllPopups}
                  isPreloading={isPreloading}
                  onOverlayClose={handleOverlayClose}
                  onRemove={handleCardDelete}
                />
              } />
            </Route>
          </Routes>
          <InfoTooltip
            isOpen={isInfoTooltipPopupOpen}
            onClose={closeAllPopups}
            status={registrationStatus}
          />
          {isLoggedIn && <Footer />}
        </CurrentUserContext.Provider>
      </div>
    </div >
  );
}

export default App;