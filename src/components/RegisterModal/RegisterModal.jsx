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
    >
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={values.name || ""}
        onChange={handleChange}
        required
      />

      <input
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        value={values.avatar || ""}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={values.email || ""}
        onChange={handleChange}
        required
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={values.password || ""}
        onChange={handleChange}
        required
      />
      <button type="button" onClick={onLogInClick}>
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
