import axios from 'axios'

export default function postRating(userId, wineId, rating) {
  return axios.post('http://localhost:5000/api/ratings', {
    userId,
    wineId,
    rating
  })
}