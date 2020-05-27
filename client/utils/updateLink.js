import axios from 'axios'

export default function updateLink(link, userId) {
  return axios.post('https://t-uncorked.herokuapp.com/api/users/link', {
    link,
    userId
  })
}