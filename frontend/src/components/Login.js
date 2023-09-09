import { useState } from "react";
import { Link } from "react-router-dom"

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    onLogin(email, password)
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <input
          autoComplete="off"
          className="auth__input"
          type="email"
          placeholder="Email"
          value={email || ''}
          onChange={handleChangeEmail}
        />
        <input

          autofill="off"
          autoComplete="off"
          className="auth__input"
          type="password"
          placeholder="Пароль"
          value={password || ''}
          onChange={handleChangePassword}
        />
        <button
          className="auth__button"
          type="submit">
          Войти
        </button>
        <p className="auth__subtitle">
          Еще не зарегистрированы? {""}
          <Link className="auth__link" to="/sign-up">
            Регистрация
          </Link>
        </p>
      </form>
    </div>
  )
}

export default Login