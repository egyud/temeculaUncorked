import axios from 'axios'

export default function updateBio(bio, userId) {
  return axios.post('https://t-uncorked.herokuapp.com/api/users/bio', {
    bio,
    userId
  })
}