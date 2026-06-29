import axios from "axios";

const API = axios.create({
  baseURL: "https://easyfix-mobile-service-app.onrender.com/api",
});

export default API;