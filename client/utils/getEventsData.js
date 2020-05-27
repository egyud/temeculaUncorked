import axios from 'axios'

export default function getEventsData(selectedWinery) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/events/winery/${selectedWinery}`)
}