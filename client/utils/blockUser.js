import axios from 'axios'

export default function blockUser(activeUserId, userToBlockId) {
  return axios.post('http://localhost:5000/api/users/block', {
    activeUserId,
    userToBlockId
  })
}