import axios from 'axios'

export default function getUserRating() {
  return axios.get(`http:/localhost:5000/api/reviews/${wineryData._id}/${user._id}`)
}