import axios from 'axios'

export default function getWineryImages(selectedWinery) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/images/${selectedWinery}`)
}