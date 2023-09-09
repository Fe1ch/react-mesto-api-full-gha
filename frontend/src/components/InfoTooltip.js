import errorIcon from "../images/Error.svg"
import successIcon from "../images/Success.svg"
const InfoTooltip = ({ isOpen, onClose, status }) => {
  const handleCLose = () => {
    onClose(true)
  }
  const icon = status === 'success' ? successIcon : errorIcon;
  const message = status === 'success' ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.';

  return (
    <div className={`popup  ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container_type_tooltip">
        <img className='popup__auth-img' src={icon} alt="" />
        <p className="popup__subtitle">{message}</p>
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть форму"
          onClick={handleCLose} />
      </div>
    </div>
  )
}
export default InfoTooltip