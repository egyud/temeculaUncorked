import axios from 'axios'

export default function getComments(id) {
  return axios.get(`http://localhost:5000/api/comments/event/${id}`)
}