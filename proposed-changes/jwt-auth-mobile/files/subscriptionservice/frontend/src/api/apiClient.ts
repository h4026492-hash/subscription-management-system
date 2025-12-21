// create an axios client with base URL pointing to backend and JSON headers
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
