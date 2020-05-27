import axios from 'axios'

export default function updateEmail(newEmail, userId) {
  return axios.post('https://t-uncorked.herokuapp.com/api/users/update-email', {
    newEmail,
    userId
  })
}