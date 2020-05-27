import axios from 'axios'

export default function updatePassword(newPassword, userId) {
  return axios.post('https://t-uncorked.herokuapp.com/api/users/update-password', {
    newPassword,
    userId
  })
}