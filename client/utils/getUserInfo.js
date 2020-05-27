import axios from 'axios'

export default function getUserInfo(userId) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/users/${userId}`)
}