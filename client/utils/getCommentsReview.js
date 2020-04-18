import axios from 'axios'

export default function getComments(reviewId) {
  axios.get(`http://localhost:5000/api/comments/review/${reviewId}`)
    
}