import axios from 'axios'

export default getEvents = () => {
  return axios.get('http://localhost:5000/api/events')
}