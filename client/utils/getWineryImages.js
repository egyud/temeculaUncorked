import axios from 'axios'

export default function getWineryImages(selectedWinery) {
  return axios.get(`http://localhost:5000/api/images/${selectedWinery}`)
}