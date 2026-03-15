import "./SideBar.css";
import avatar from "../../assets/avatar.svg";

export default function SideBar() {
  const username = "Terrence Tegegne";

  return (
    <aside className="sidebar">
      <div className="sidebar__profile">
        <span className="sidebar__username">{username}</span>
        <img src={avatar} alt="Terrence Tegegne" className="sidebar__avatar" />
      </div>
    </aside>
  );
}
