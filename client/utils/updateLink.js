import axios from 'axios'

export default function updateLink(link, userId) {
  return axios.post('http://localhost:5000/api/users/link', {
    link,
    userId
  })
}