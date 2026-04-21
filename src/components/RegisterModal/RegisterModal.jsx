import { useForm } from "../../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister, onLogInClick }) {
  const { values, handleChange, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values).then(() => resetForm());
  };

  return (
    isOpen && (
      <div className="modal">
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2>Sign Up</h2>

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

          <button type="submit">Register</button>
          <button type="button" onClick={onLogInClick}>
            Log In
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    )
  );
}

export default RegisterModal;
