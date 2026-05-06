import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, weatherData, openLogin, openRegister }) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = !!currentUser;

  return (
    <header className="header">
      {/* LEFT: LOGO */}
      <NavLink to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>

      {/* CENTER: DATE + LOCATION */}
      <div className="header__info">
        <p className="header__date">{currentDate}</p>
        <p className="header__location">{weatherData.city}</p>
      </div>

      {/* RIGHT: CONTROLS */}
      <div className="header__controls">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              className="button header__add-clothes-button"
              onClick={handleAddClick}
            >
              + Add clothes
            </button>

            <NavLink to="/profile" className="header__profile-link">
              <span className="header__username">{currentUser.name}</span>
              <img
                src={currentUser.avatar || avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            </NavLink>
          </>
        ) : (
          <div className="header__auth-buttons">
            <button className="header__sign-in-button" onClick={openLogin}>
              Sign In
            </button>
            <button className="header__register-button" onClick={openRegister}>
              Register
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
