import PopupWithForm from "./PopupWithForm";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, isPreloading, onOverlayClose }) => {

  const handleSubmit = (data) => {
    onAddPlace({
      name: data.name,
      link: data.link
    });
  }

  return (
    <PopupWithForm
      name="new-card"
      title="Новое место"
      buttonText={isPreloading ? "Сохранение..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
    >
      {({ register, errors }) =>
        <>
          <input
            {...register("name", {
              required: "Поле обязательно для заполнения",
              minLength: { value: 2, message: "Минимальная длина - 2 символа" },
              maxLength: { value: 30, message: "Максимальная длина - 30 символов" }
            })}
            className={`popup__input ${errors.name && 'popup__input_type_error'} popup__input_type_card-name`}
            id="input-card-name"
            type="text"
            placeholder="Название"
          />
          {
            errors.name && (
              <span className="popup__input-error" id="input-card-name-error">
                {errors.name.message}
              </span>
            )
          }
          <input
            {...register("link", {
              required: "Поле обязательно для заполнения",
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: "Введите корректный URL-адрес"
              }
            })}
            className="popup__input popup__input_type_card-link"
            id="input-card-link"
            type="url"
            placeholder="Ссылка на картинку"
            value={register.link?.value}
          />
          {
            errors.link && (
              <span className="popup__input-error" id="input-card-link-error">
                {errors.link.message}
              </span>
            )
          }
        </>
      }
    </PopupWithForm >
  )
}

export default AddPlacePopup;