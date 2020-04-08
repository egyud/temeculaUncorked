function addLike(type, userId, contentId) {
  // type prop will be either 'reviews' or 'comments'
  if (type === 'reviews') {
    axios.post('http://localhost:5000/api/reviews/like', {
      userId,
      reviewId: contentId
    })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  } else {
    axios.post('http://localhost:5000/api/comments/like', {
      userId,
      commentId: contendId
    })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }
}

export default addLike