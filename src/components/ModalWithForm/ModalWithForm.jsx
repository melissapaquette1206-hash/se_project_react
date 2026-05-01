import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon-gray.svg";

function ModalWithForm({ children, title, isOpen, onClose, onSubmit }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`} onClick={onClose}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{title}</h2>

        <button onClick={onClose} type="button" className="modal__close">
          <img
            src={closeIcon}
            alt="Close modal"
            className="modal__close-icon"
          />
        </button>

        <form onSubmit={onSubmit} className="modal__form">
          {children}
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
