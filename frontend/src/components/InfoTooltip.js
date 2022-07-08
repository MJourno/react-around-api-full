import React from 'react';

function InfoToolTip(props) {
  const info = props.regSuccess
    ? 'Success! You have now been registered.'
    : 'Oops, something went wrong! Please try again.';

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
          <div name={`form__${props.name}`}
          className={`popup__form popup__form_type_${props.name}`}>
          <div className={`infoToolTip__symbol ${props.regSuccess ? `infoToolTip__symbol_regSuccess`
          : `infoToolTip__symbol_regFailure`}`}/>
          <p className="infoToolTip__info">
            {info}
          </p>
          </div>
      </div>
    </div>
  );
}
export default InfoToolTip;