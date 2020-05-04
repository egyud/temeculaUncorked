const axios = require('axios')

exports.getClubs = async () => {
  try {
    let response = axios.get('http://localhost:5000/api/wineries/club')
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}