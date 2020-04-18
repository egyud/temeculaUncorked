import axios from 'axios'

export default function getUserReviews(userId) {
  return axios.get(`http://localhost:5000/api/reviews/${userId}`)
}