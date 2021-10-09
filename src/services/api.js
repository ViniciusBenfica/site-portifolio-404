import axios from "axios"

const api = axios.create({baseURL: "http://51.81.20.214:8001"})

export { api }