export const BASE_URL = 'https://register.nomoreparties.co';
function getResponseData(response, errorText) {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(errorText);
  }
}
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) =>
      getResponseData(response, 'Unsuccessful register')
    )
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, email: email }),
  })
    .then((response) =>
      getResponseData(response, 'Unsuccessful log in')
    )
    .then((data) => {
      if (data) {
        localStorage.setItem('token', data.token);
        return data;
      }
    })
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`,
    {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
    .then((response) =>
      getResponseData(response, 'The provided token is invalid')
    )
};
