import { Link, useParams } from "react-router-dom"

const ImagePopup = ({ cards, card, isOpen, onClose, onOverlayClose }) => {

  const getCardsById = (cards, _id) => cards.find(card => card._id === _id)
  const { id } = useParams()
  const selectedCard = getCardsById(cards, id)
  const isPopupOpen = selectedCard || isOpen;

  return (
    <div
      className={`popup popup_type_image ${isPopupOpen ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClose}>
      <div
        className="popup__container popup__container_type_image">
        <Link
          to='/'
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose} />
        <img
          className="popup__photo"
          src={selectedCard?.link}
          alt={selectedCard?.name} />
        <figcaption
          className="popup__photo-subtitle">
          {selectedCard?.name}
        </figcaption>
      </div>
    </div >
  )
}
export default ImagePopup