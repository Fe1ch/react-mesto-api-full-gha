import { useContext } from "react";
import PopupWithForm from "./PopupWithForm"
import { CurrentUserContext } from "../contexts/CurrentUserContext";


const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isPreloading, onOverlayClose }) => {

  const { name, about } = useContext(CurrentUserContext)

  const handleSubmit = (data) => {
    onUpdateUser({
      name: data.name,
      about: data.about,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      buttonText={isPreloading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
    >
      {({ register, errors }) =>
        <>
          <input
            {...register("name", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 2,
                message: "Минимальная длина - 2 символа"
              },
              maxLength: {
                value: 30,
                message: "Максимальная длина - 30 символов"
              }
            })}
            className="popup__input popup__input_type_profile-name"
            id="input-name"
            name="name"
            type="text"
            placeholder="Имя"
            defaultValue={name}
          />
          {errors.name && (
            <span className="popup__input-error" id="input-name-error">
              {errors.name.message}
            </span>
          )}
          <input
            {...register("about", {
              required: "Поле обязательно для заполнения",
              minLength: {
                value: 10,
                message: "Минимальная длина - 10 символов"
              },
              maxLength: {
                value: 200,
                message: "Максимальная длина - 200 символов"
              }
            })}
            className="popup__input popup__input_type_profile-about"
            id="input-about"
            name="about"
            type="text"
            placeholder="О себе"
            defaultValue={about}
          />
          {errors.about && (
            <span className="popup__input-error" id="input-about-error">
              {errors.about.message}
            </span>
          )}
        </>
      }
    </PopupWithForm>
  )
}

export default EditProfilePopup
