import axios from 'axios'
import { showMessage } from 'react-native-flash-message'

export default function postReview(winery, user, reviewText, rating, navigation) {
  axios.post(`https://t-uncorked.herokuapp.com/api/reviews/winery`, {
    winery,
    user,
    reviewText,
    rating
  })
    .then(res => {
      showMessage({
        message: res.data.message,
        type: 'success'
      })
      navigation.navigate('Winery', { winery })
    })
    .catch(err => {
      showMessage({
        message: err.response.data.message,
        type: 'warning'
      })
    })
}