import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onCancel, onConfirm }) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    onConfirm();
  };

  return (
    <ModalWithForm
      title="Delete item"
      name="confirm-delete"
      buttonText="Yes, delete item"
      isOpen={isOpen}
      onClose={onCancel}
      onSubmit={handleSubmit}
    >
      <p className="modal__confirm-text">
        Are you sure you want to delete this item?
        <br />
        This action is irreversible.
      </p>
      <button type="button" className="modal__cancel" onClose={onCancel}>
        Cancel
      </button>
    </ModalWithForm>
  );
}

export default DeleteConfirmationModal;
