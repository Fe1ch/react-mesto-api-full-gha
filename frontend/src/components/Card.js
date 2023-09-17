import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Link } from 'react-router-dom';

const Card = ({ card, onCardClick, onCardLike, onCardDelete }) => {

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`;

  const handleCardClick = () => onCardClick(card);
  const handleLikeClick = () => onCardLike(card);
  const handleDeleteClick = () => onCardDelete(card);

  return (
    <li className="element">
      <Link style={{ textDecoration: 'none', color: 'var(--text-color)' }}
        to={`cards/${card._id}`}>
        <img
          className="element__photo"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
      </Link>
      {isOwn &&
        < Link to='cards/popupDelete'
          onClick={handleDeleteClick}
          className="element__delete-icon"
          type="button"
          aria-label="Удалить" />
      }
      <div className="element__group">
        <h2 className="element__subtitle">
          {card.name}
        </h2>
        <div className="element__likes-container">
          <button
            onClick={handleLikeClick}
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайк" />
          <span
            className="element__count-like">
            {card.likes.length}
          </span>
        </div>
      </div>
    </li>
  )
}

export default Card