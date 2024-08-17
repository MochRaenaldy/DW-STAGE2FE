import axios from "axios";

const tokenAuth = localStorage.getItem("token");

const headers = {};

if (tokenAuth) {
  Object.assign(headers, { Authorization: `Bearer ${tokenAuth}` });
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
  headers: headers,
});

export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    localStorage.setItem("token", token);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.clear();
    setTimeout(() => {
      window.location.replace("/auth/login");
    }, 2000);
  }
};
