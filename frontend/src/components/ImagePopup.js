function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_img
     ${props.card ? "popup_is-open" : ""
        }`}
    >
      <div className="popup__container popup__container-img">
        <button
          onClick={props.onClose}
          aria-label="Close"
          type="button"
          className="button popup__close popup__close-img" />
        <img
          className="popup__img"
          src={props.card ? props.card.link : "#"}
          alt={props.card ? props.card.name : ""} />
        <p className="popup__caption">
          {props.card ? props.card.name : ""}
        </p>
      </div>
    </div>
  )
}
export default ImagePopup;