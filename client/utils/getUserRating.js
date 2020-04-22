import axios from 'axios'

export default function getUserRating(wineryId, userId) {
  return axios.get(`http:/localhost:5000/api/reviews/${wineryId}/${userId}`)
}