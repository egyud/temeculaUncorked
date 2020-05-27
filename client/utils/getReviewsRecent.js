import axios from 'axios'

export default function getReviews() {
  return axios.get('https://t-uncorked.herokuapp.com/api/reviews/winery/recent')
}