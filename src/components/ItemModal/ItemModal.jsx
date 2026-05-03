import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteCard }) {
  const handleDeleteClick = () => {
    if (onDeleteCard) {
      onDeleteCard(card);
    }
  };

  const currentUser = useContext(CurrentUserContext);
  const isOwn = card?.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__delete-button ${isOwn ? "" : "modal__delete-button_hidden"}`;

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
          <button
            type="button"
            className={itemDeleteButtonClassName}
            onClick={handleDeleteClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
