import axios from 'axios'

export default function followUser(userIdToFollow, activeUser) {
  return axios.post(`http://localhost:5000/api/users/follow`, {
    userIdToFollow,
    activeUser
  })
}