import axios from 'axios'

export default function getUserRating(wineId, userId) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/ratings/${wineId}/${userId}`)
}