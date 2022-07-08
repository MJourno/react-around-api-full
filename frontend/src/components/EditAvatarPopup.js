import React from "react";
import PopupWithForm from "./PopupWithForm"

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
      <PopupWithForm
        name="edit-profile-img"
        title="Change profile picture"
        value="Save"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          type="url"
          id="input_type_Img_link"
          className="popup__input popup__input_type_avatar"
          name="avatar"
          placeholder="Image link"
          ref={avatarRef}
          required />
        <span
          id="input_type_Img_link-error"
          className="popup__error" />
      </PopupWithForm>
  )
}
export default EditAvatarPopup;