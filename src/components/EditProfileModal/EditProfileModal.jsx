import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues, resetForm } = useForm();

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, setValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(values).then(() => resetForm());
  };

  return (
    isOpen && (
      <div className="modal">
        <form className="modal__form" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>

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

          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    )
  );
}

export default EditProfileModal;
