// Utility helpers for simple client-side authentication state.
// These functions store, retrieve, and clear the current user
// using localStorage, and provide a quick way to check
// if the user is currently logged in.

export function saveUser(user) {
  // user: { id, name, email }
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isLoggedIn", "true");
}

export function getUser() {
  const raw = localStorage.getItem("user");
  return raw ? JSON.parse(raw) : null;
}

export function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true" && !!getUser();
}

export function clearUser() {
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
}