import axios from "axios";

const tokenAuth = localStorage.getItem("token");

const headers = {};

if (tokenAuth) {
  Object.assign(headers, { Authorization: `Bearer ${tokenAuth}` });
}

export const api = axios.create({
  baseURL: import.meta.env.API_URL || "https://dw-stage-2-be.vercel.app/",
  headers: headers,
});

export const setAuthToken = (token?: string) => {
  console.log(token)
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
