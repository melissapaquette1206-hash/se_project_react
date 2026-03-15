import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, onDelete }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onDelete();
  };

  return (
    <ModalWithForm
      title="Delete item"
      name="confirm-delete"
      buttonText="Yes, delete item"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <p className="modal__confirm-text">
        Are you sure you want to delete this item?
        <br />
        This action is irreversible.
      </p>
      <button type="button" className="modal__cancel" onClick={onClose}>
        Cancel
      </button>
    </ModalWithForm>
  );
}

export default DeleteConfirmationModal;
