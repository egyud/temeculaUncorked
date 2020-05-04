const axios = require('axios')

exports.getWines = async (winery) => {
  try {
    let response = axios.get(`http://localhost:5000/api/wines/${winery}`)
    return response.data.wines
  } catch (error) {
    console.error(error)
  }
}