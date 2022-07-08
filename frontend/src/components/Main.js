import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div
          className="avatar"
          style={{ backgroundImage: `url(${currentUser.avatar})` }}>
          <button
            aria-label="edit"
            type="button"
            className="button profile__edit-img-button"
            onClick={props.onEditAvatarClick} />
        </div>
        <div className="profile__info">
          <h1 className="profile__value profile__value_type_name">
            {currentUser.name}
          </h1>
          <button
            aria-label="edit"
            type="button"
            className="button profile__edit"
            onClick={props.onEditProfileClick} />
          <p className="profile__value profile__value_type_description">
            {currentUser.about}
          </p>
        </div>
        <button
          aria-label="add"
          type="button"
          className="button profile__add-button"
          onClick={props.onAddPlaceClick} />
      </section>
      <section className="cards">
        <ul className="elements">
          {props.cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              likes={card.likes}
              link={card.link}
              title={card.name}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))
          }
        </ul>
      </section>
    </main>
  )
}
export default Main;