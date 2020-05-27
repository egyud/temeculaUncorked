const axios = require('axios')

exports.getEvents = async (name) => {
  try {
    let response = await axios.get(`https://t-uncorked.herokuapp.com/api/events/winery/${name}`)
    return response.data.events
  } catch(error) {
    console.error(error)
  }
}