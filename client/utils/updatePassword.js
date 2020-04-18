import axios from 'axios'

export default function updatePassword(newPassword, userId) {
  return axios.post('http://localhost:5000/api/users/update-password', {
    newPassword,
    userId
  })
}