import axios from 'axios'

export default function postRating(userId, wineId, rating) {
  return axios.post('https://t-uncorked.herokuapp.com/api/ratings', {
    userId,
    wineId,
    rating
  })
}