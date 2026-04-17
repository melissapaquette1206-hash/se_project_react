const baseUrl = "http://localhost:3001";

const headers = { "Content-Type": "application/json" };

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

export const getItems = () =>
  fetch(`${baseUrl}/items`, { headers }).then(handleServerResponse);

export const addItem = ({ name, imageUrl, weather }) =>
  fetch(`${baseUrl}/items`, {
    method: "POST",
    headers,
    body: JSON.stringify({ name, imageUrl, weather }),
  }).then(handleServerResponse);

export const deleteItem = (itemID) =>
  fetch(`${baseUrl}/items/${itemID}`, {
    method: "DELETE",
    headers,
  }).then(handleServerResponse);

export const addItem = (data, token) => {
  return fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
};
