import axios from 'axios'

export default function getComments(reviewId) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/comments/review/${reviewId}`)
}