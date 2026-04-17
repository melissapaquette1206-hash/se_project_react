import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
        onClick={handleCardClick}
      />
    </li>
  );
}

const isLiked = item.likes.some((id) => id === currentUser._id);

<button
  className={isLiked ? "card__like_active" : "card__like"}
  onClick={handleLike}
/>;

export default ItemCard;
