import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"

const Register = ({ onRegister }) => {

  const { handleSubmit, register, formState: { isValid, errors } } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    onRegister(data.email, data.password);
  };

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form
        noValidate
        className="auth__form"
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
      >
        <input
          {...register("email", {
            required: "Введите email",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Некорректный адрес email"
            }
          })}
          className="auth__input"
          type="email"
          placeholder="Email"
        />
        {errors.email && (
          <span className="popup__input-error" id="input-avatar-link-error">
            {errors.email.message}
          </span>
        )}
        <input
          {...register("password", {
            required: "Введите пароль",
            minLength: {
              value: 8,
              message: "Минимальная длина пароля - 8 символов"
            }
          })}
          className="auth__input"
          type="password"
          placeholder="Пароль"
        />
        {errors.password && (
          <span className="popup__input-error" id="input-avatar-link-error">
            {errors.password.message}
          </span>
        )}
        <button
          className="auth__button"
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <p className="auth__subtitle">
          Уже зарегистрированы? {""}
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Register
