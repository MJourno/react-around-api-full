import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  
  const isOwn = props.card.owner._id === currentUser._id;
  
  const cardDeleteButtonClassName = (
    `button element__delete ${isOwn && 'button element__delete_visible'}`
  );

  const isLiked = props.card.likes.some(user => user._id === currentUser._id);

  const cardLikeButtonClassName = (
    `button element__like-button ${isLiked && 'button element__like-button_active'}`
  );

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  function onCardClick() {
    props.onCardClick(props.card);
  }

  return (
    <li
      className="element card">
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick} />
      <div
        className="element__img"
        style={{ backgroundImage: `url(${props.link})` }}
        onClick= {onCardClick} />
      <div className="element__info">
        <h2
          className="element__title">
          {props.title}
        </h2>
        <div
          className="element__like-wrapper">
          <button
            aria-label="like"
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          />
          <span className="element__like-count">
            {props.likes.length}
          </span>
        </div>
      </div>
    </li>
  )
}

export default Card;