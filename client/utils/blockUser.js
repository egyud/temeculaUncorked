import axios from 'axios'

export default function blockUser(activeUserId, userToBlockId) {
  return axios.post('https://t-uncorked.herokuapp.com/api/users/block', {
    activeUserId,
    userToBlockId
  })
}