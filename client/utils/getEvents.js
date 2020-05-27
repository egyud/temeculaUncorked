import axios from 'axios'

export default getEvents = () => {
  return axios.get('https://t-uncorked.herokuapp.com/api/events')
}