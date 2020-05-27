const axios = require('axios')

exports.getClubs = async () => {
  try {
    let response = axios.get('https://t-uncorked.herokuapp.com/api/wineries/club')
    return response.data.data
  } catch (error) {
    console.error(error)
  }
}