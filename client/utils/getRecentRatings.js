import axios from 'axios'

export default function getRecentRatings(wineId) {
  return axios.get(`http://localhost:5000/api/ratings/recent/${wineId}`)
}