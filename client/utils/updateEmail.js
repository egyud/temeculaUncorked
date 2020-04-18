import axios from 'axios'

export default function updateEmail(newEmail, userId) {
  return axios.post('http://localhost:5000/api/users/update-email', {
    newEmail,
    userId
  })
}