import { Link } from "react-router-dom";

const MobileMenu = ({ isOpen, email, onSignOut }) => {
  return (
    <div className={`mobile__menu ${isOpen ? "mobile__menu_active" : ""}`}>
      <p className="mobile__email">{email || ""}</p>
      <Link className="mobile__link" onClick={onSignOut}>
        Выйти
      </Link>
    </div>
  );
};

export default MobileMenu;