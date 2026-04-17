import "./ItemModal.css";
import closeIcon from "../../assets/close-icon-white.svg";

const isOwn = selectedCard.owner === currentUser._id;

const itemDeleteButtonClassName = `modal__delete-button ${isOwn ? "" : "modal__delete-button_hidden"}`;

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  const handleDeleteClick = () => {
    if (onDeleteClick) {
      onDeleteClick(card);
    }
  };

  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
      onClick={onClose}
    >
      <div
        className="modal__content_type_image"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          type="button"
          className="modal__close_type_preview"
        ></button>
        <img src={card?.imageUrl} alt={card?.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card?.name}</h2>
          <p className="modal__weather">Weather: {card?.weather}</p>
        </div>
        <button
          type="button"
          className="modal__delete"
          onClick={handleDeleteClick}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
