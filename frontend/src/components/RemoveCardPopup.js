import PopupWithForm from "./PopupWithForm"

const RemoveCardPopup = ({ isOpen, onClose, isPreloading, onOverlayClose, onRemove }) => {

  const handleSubmit = () => {
    onRemove();
  }
  return (
    <PopupWithForm name="submit-delete"
      title="Вы уверены?"
      buttonText={isPreloading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}>
      {() => { }}
    </PopupWithForm>

  );

}

export default RemoveCardPopup