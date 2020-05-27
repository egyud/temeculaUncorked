import axios from 'axios'

export default function getRecentRatings(wineId) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/ratings/recent/${wineId}`)
}