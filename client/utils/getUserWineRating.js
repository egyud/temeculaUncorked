import axios from 'axios'

export default function getUserRating(wineId, userId) {
  return axios.get(`http://localhost:5000/api/ratings/${wineId}/${userId}`)
}