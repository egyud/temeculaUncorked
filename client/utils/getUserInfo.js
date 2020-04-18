import axios from 'axios'

export default function getUserInfo(userId) {
  return axios.get(`http://localhost:5000/api/users/${userId}`)
}