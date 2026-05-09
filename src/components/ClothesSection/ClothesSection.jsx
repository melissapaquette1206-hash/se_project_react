import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

export default function ClothesSection({
  clothingItems,
  onAddClick,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your items</p>
        <button
          className="button clothes-section__button"
          onClick={onAddClick}
          type="button"
        >
          + Add new
        </button>
      </div>
      <ul className="button clothes-section__items">
        {clothingItems
          .filter((item) => item.owner === currentUser?._id)
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
              />
            );
          })}
      </ul>
    </div>
  );
}
