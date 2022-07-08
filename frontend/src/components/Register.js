import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onSignup({ email, password });
  }

  return (
    <div className="form__container">
      <form
        className="form"
        title="register"
        onSubmit={handleSubmit}
      >
        <h2 className="form__title">Sign up</h2>
        <input
          className="form__input"
          placeholder="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="form__input"
          placeholder="Password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)} />
        <button
          className="form__submit-button"
          type="submit"
          onSubmit={handleSubmit}
          to="/main"
        >Sign up</button>
        <Link
          className="form__link"
          to="/signin">
          Already a member? Log in here!
        </Link>
      </form>
    </div>
  )
}
export default Register;