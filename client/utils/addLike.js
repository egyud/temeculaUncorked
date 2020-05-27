function addLike(type, userId, contentId) {
  // type prop will be either 'reviews' or 'comments'
  if (type === 'reviews') {
    axios.post('https://t-uncorked.herokuapp.com/api/reviews/like', {
      userId,
      reviewId: contentId
    })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  } else {
    axios.post('https://t-uncorked.herokuapp.com/api/comments/like', {
      userId,
      commentId: contendId
    })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }
}

export default addLike