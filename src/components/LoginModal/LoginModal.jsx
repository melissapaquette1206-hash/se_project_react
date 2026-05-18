import "./LoginModal.css";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, onSignUpClick }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values).then(() => resetForm());
  };

  return (
    <ModalWithForm
      title="Log In"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText="Log In"
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>

      <button
        type="button"
        className="modal__switch-button"
        onClick={onSignUpClick}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
