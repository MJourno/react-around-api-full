import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handledescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Edit profile"
      value="Save"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        name="name"
        id='input_type_name'
        className="popup__input popup__input_type_name"
        type="text"
        placeholder="Name"
        required minLength="2"
        maxLength="40"
        onChange={handleNameChange}
        value={name || ''} />
      <span
        id='input_type_name-error'
        className="popup__error" />
      <input
        name="about"
        id='input_type_description'
        className="popup__input popup__input_type_description"
        type="text"
        placeholder="About me"
        required minLength="2"
        maxLength="200"
        onChange={handledescriptionChange}
        value={description || ''} />
      <span
        id='input_type_description-error'
        className="popup__error" />
    </PopupWithForm>
  )
}
export default EditProfilePopup