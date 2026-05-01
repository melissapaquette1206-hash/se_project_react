import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";

export default function ClothesSection({
  clothingItems,
  onAddClick,
  onCardClick,
  onCardLike,
  currentUser,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p>Your items</p>
        <button
          className="clothes-section__button"
          onClick={onAddClick}
          type="button"
        >
          + Add new
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems
          .filter((item) => item.owner === currentUser._id)
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
