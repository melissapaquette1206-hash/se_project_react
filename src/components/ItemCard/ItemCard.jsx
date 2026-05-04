import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = currentUser
    ? item.likes?.some((id) => id === currentUser._id)
    : false;

  return (
    <li className="card">
      <button
        className="card__image-button"
        onClick={() => onCardClick(item)}
        aria-label={`View ${item.name}`}
      >
        <img className="card__image" src={item.imageUrl} alt={item.name} />
      </button>

      <div className="card__content">
        <h2 className="card__name">{item.name}</h2>

        {currentUser?._id && (
          <button
            className={`card__like-button ${
              isLiked ? "card__like-button_active" : ""
            }`}
            onClick={() => onCardLike(item)}
            aria-label="Like item"
          />
        )}
      </div>
    </li>
  );
}

export default ItemCard;
