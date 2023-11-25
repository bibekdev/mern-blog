import axios from 'axios'

const URL = 'http://localhost:8000/api/v1'

export const api = axios.create({
  baseURL: URL,
  withCredentials: true,
})
