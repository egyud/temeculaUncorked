import axios from 'axios'

export default function attendEvent(userId, eventId) {
  return axios.post('http://localhost:5000/api/events/attend', {
      userId,
      eventId
    })
}