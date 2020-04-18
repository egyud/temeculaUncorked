import axios from 'axios'

export default function getWineryData(selectedWinery) {
  return axios.get(`http://localhost:5000/api/wineries/page/${selectedWinery}`)
}