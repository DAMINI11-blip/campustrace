import axios from "axios"

const API = axios.create({
  baseURL: "https://campustrace-s23e.onrender.com",
})

export default API
