import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Login(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    props.onSignin({ email, password });
  }

  return (
    <div className="form__container">
      <form
        className="form"
        title="Log in"
        onSubmit={handleSubmit}
      >
        <h2 className="form__title">Log in</h2>
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
        >Log in</button>
        <Link
          className="form__link"
          to="/signup">
          Not a member yet? Sign up here!
        </Link>
      </form>
    </div>
  )
}
export default Login;