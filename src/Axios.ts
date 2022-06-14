import axios from "axios";

export default axios.create({
  baseURL: "https://api.coincap.io/v2/",
  headers: { "Content-Type": "application/json" },
  responseType: "json",
  timeout: 10000,
});
