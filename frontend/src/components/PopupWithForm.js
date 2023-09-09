import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

const PopupWithForm = ({ name, title, buttonText, isOpen, onClose, children, onSubmit, onOverlayClose }) => {

  const { handleSubmit, register, formState: { isValid, errors } } = useForm({ mode: 'onChange' });

  const [isMounted, setIsMounted] = useState(false)


  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section
      className={`popup popup_type_${name} ${isOpen && isMounted ? "popup_opened" : ""}`}
      onMouseDown={onOverlayClose}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form
          className="popup__form"
          name={`form-${name}`}
          onSubmit={handleSubmit(onSubmit)}
        >
          {children(
            {
              register,
              errors,
            }
          )}
          <button
            className={`popup__button ${!isValid ? "popup__button_disabled" : ""}`}
            type="submit"
            disabled={!isValid}
          >
            {buttonText}
          </button>
        </form>
        <Link
          to='/'
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose} >
        </Link>
      </div>
    </section >
  )
}
export default PopupWithForm
