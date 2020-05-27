import axios from 'axios'

export default function getComments(id) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/comments/event/${id}`)
}