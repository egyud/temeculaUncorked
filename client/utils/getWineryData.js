import axios from 'axios'

export default function getWineryData(selectedWinery) {
  return axios.get(`https://t-uncorked.herokuapp.com/api/wineries/page/${selectedWinery}`)
}