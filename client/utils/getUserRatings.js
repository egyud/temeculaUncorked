import axios from 'axios'

export default function getUserRatings(userId) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/ratings/${userId}`)
}