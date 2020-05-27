import axios from 'axios'

export default function deleteUser(id) {
  return axios.post('https://t-uncorked.herokuapp.com/api/users/delete', {
    id
  })
}