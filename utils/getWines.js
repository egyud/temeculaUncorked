const axios = require('axios')

exports.getWines = async (winery) => {
  try {
    let response = axios.get(`https://t-uncorked.herokuapp.com/api/wines/${winery}`)
    return response.data.wines
  } catch (error) {
    console.error(error)
  }
}