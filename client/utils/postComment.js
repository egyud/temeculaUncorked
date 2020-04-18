import axios from 'axios'

export const postEventComment = (text, userId, eventId) => {
  return axios.post(`http://localhost:5000/api/comments/event`, {
    text,
    userId,
    eventId
  })
}

export const postReviewComment = (text, userId, reviewId) => {
  axios.post(`http://localhost:5000/api/comments`, {
    text,
    userId,
    reviewId
  })
}