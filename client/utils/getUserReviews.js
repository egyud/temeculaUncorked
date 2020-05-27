import axios from 'axios'

export default function getUserReviews(userId) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/reviews/${userId}`)
}