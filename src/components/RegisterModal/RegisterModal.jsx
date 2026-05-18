import "./RegisterModal.css";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({ isOpen, onClose, onRegister, onLogInClick }) {
  const { values, handleChange, resetForm } = useForm({
    name: "",
    avatar: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values).then(() => resetForm());
  };

  return (
    <ModalWithForm
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Sign Up"
    >
      <label className="modal__label">
        <span className="modal__label-text">Email*</span>
        <input
          className="modal__input"
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Password*</span>
        <input
          className="modal__input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        <span className="modal__label-text">Name*</span>
        <input
          className="modal__input"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>

      <label className="modal__label">
        <span className="modal__label-text">Avatar URL*</span>
        <input
          className="modal__input"
          type="url"
          name="avatar"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
          required
        />
      </label>
      <button
        type="button"
        className="modal__switch-button"
        onClick={onLogInClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
