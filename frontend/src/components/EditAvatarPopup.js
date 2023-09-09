import { useEffect, useRef, memo } from "react"
import PopupWithForm from "./PopupWithForm"

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, isPreloading, onOverlayClose }) => {

  const avatarUser = useRef()

  useEffect(() => {
    avatarUser.current.value = "";
  }, [isOpen])

  const handleSubmit = () => {
    onUpdateAvatar({
      avatar: avatarUser.current.value,
    });

  }
  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText={isPreloading ? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      onSubmit={handleSubmit}
    >
      {({ register, errors }) => {
        const { ref, ...rest } = register('avatar', {
          required: "Поле обязательно для заполнения",
          pattern: {
            value: /^(ftp|http|https):\/\/[^ "]+$/,
            message: "Введите корректный URL-адрес",
          },
        })

        return (
          <>
            <input
              {...rest}
              ref={(e) => {
                ref(e)
                avatarUser.current = e
              }}
              className={`popup__input popup__input_type_avatar-link ${errors.avatar ? "popup__input_type_error" : ""}`}
              id="input-avatar-link"
              name="avatar"
              type="url"
              placeholder="Добавьте ссылку на аватар"
              required
            />
            {errors.avatar && (
              <span className="popup__input-error" id="input-avatar-link-error">
                {errors.avatar.message}
              </span>
            )}
          </>)
      }}
    </PopupWithForm>
  )
}

export default memo(EditAvatarPopup)