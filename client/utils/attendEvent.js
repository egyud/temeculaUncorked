import axios from 'axios'

export default function attendEvent(userId, eventId) {
  return axios.post('https://t-uncorked.herokuapp.com/api/events/attend', {
      userId,
      eventId
    })
}