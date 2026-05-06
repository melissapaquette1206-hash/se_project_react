import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <span className="sidebar__username">{currentUser?.name}</span>
        <img
          src={currentUser?.avatar}
          alt={currentUser?.name}
          className="sidebar__avatar"
        />
      </div>
      <div className="sidebar__buttons">
        <button className="button sidebar__edit-button" onClick={onEditProfile}>
          Edit profile
        </button>
        <button className="button sidebar__signout-button" onClick={onSignOut}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
