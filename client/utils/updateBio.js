import axios from 'axios'

export default function updateBio(bio, userId) {
  return axios.post('http://localhost:5000/api/users/bio', {
    bio,
    userId
  })
}