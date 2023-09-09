import { useContext, memo } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

const Profile = ({
  onEditProfile,
  onAddPlace,
  onEditAvatar
}
) => {

  const currentUser = useContext(CurrentUserContext);

  return (
    <section className="profile">

      <Link style={{ textDecoration: 'none', color: 'var(--text-color)' }}
        to='popupAvatar'
        className="profile__avatar-edit"
        type="button"
        aria-label="Изменить аватар профиля"
        onClick={onEditAvatar}>
        <img
          className="profile__avatar"
          src={currentUser.avatar}
          alt={currentUser.name} />
      </Link>

      <div className="profile__info">
        <h1 className="profile__title">{currentUser.name}</h1>
        <Link
          to='popupEdit'
          className="profile__edit-button"
          type="button"
          aria-label="Редактировать профиль"
          onClick={onEditProfile}
        />
        <p className="profile__subtitle">{currentUser.about}</p>
      </div>

      <Link
        to='popupCard'
        className="profile__add-button"
        type="button"
        onClick={onAddPlace} />
    </section>
  )
}

export default memo(Profile)
