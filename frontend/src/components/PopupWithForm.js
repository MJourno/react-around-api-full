function PopupWithForm(props) {

  return (
    <div className={`popup popup_type_${props.name}
     ${props.isOpen ? "popup_is-open" : ""
      }`}>
      <div className={`popup__container popup__container-${props.name}`}>
        <button
          aria-label="Close"
          type="button"
          onClick={props.onClose}
          className={`button popup__close popup__close-${props.name}`} />
        <form name={`form__${props.name}`}
          className={`popup__form popup__form_type_${props.name}`}>
          <h2 className="popup__title">
            {props.title}
          </h2>
          {props.children}
          <button
            aria-label="save"
            type="submit"
            value="Save"
            onClick={props.onSubmit}
            className="button popup__save">
            {props.value}
          </button>
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm;