import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onClose, handleDelete }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleDelete();
  };

  return (
    <ModalWithForm
      title="Delete Item"
      buttonText="Delete"
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
