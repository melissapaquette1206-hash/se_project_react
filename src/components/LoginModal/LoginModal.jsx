import { useForm } from "../../hooks/useForm";

function LoginModal({ isOpen, onClose, onLogin, onSignUpClick }) {
  const { values, handleChange, resetForm } = useForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(values).then(() => resetForm());
  };

  return (
    isOpen && (
      <div className="modal">
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2>Log In</h2>

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

          <button type="submit">Log In</button>
          <button type="button" onClick={onSignUpClick}>
            Sign Up
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    )
  );
}

export default LoginModal;
