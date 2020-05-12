import axios from 'axios'

export default function deleteUser(id) {
  return axios.post('http://localhost:5000/api/users/delete', {
    id
  })
}