import axios from 'axios'

export const postEventComment = (text, userId, eventId) => {
  return axios.post(`https://t-uncorked.herokuapp.com/api/comments/event`, {
    text,
    userId,
    eventId
  })
}

export const postReviewComment = (text, userId, reviewId) => {
  axios.post(`https://t-uncorked.herokuapp.com/api/comments`, {
    text,
    userId,
    reviewId
  })
}