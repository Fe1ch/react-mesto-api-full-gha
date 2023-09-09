const BASE_URL = "https://auth.nomoreparties.co";
const headers = { "Content-Type": "application/json" };

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function register(email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse);
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ email, password })
  })
    .then(checkResponse);
}
export function checkToken(token) {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    }
  })
    .then(checkResponse);
}