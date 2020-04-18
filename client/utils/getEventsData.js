import axios from 'axios'

export default function getEventsData(selectedWinery) {
  return axios.get(`http://localhost:5000/api/events/winery/${selectedWinery}`)
}