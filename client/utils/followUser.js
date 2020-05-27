import axios from 'axios'

export default function followUser(userIdToFollow, activeUser) {
  return axios.post(`https://t-uncorked.herokuapp.com/api/users/follow`, {
    userIdToFollow,
    activeUser
  })
}