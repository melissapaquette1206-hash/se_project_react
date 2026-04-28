import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);
  const handleCardClick = () => {
    onCardClick(item);
  };
  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
      <button
        className={isLiked ? "card__like_active" : "card__like"}
        onClick={onCardLike}
      />
    </li>
  );
}

export default ItemCard;
