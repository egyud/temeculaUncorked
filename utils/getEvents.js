const axios = require('axios')

exports.getEvents = async (name) => {
  try {
    let response = await axios.get(`http://localhost:5000/api/events/winery/${name}`)
    return response.data.events
  } catch(error) {
    console.error(error)
  }
}