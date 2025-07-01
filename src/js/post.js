const getPostData = (postId) => {
  return new Promise((resolve) => {
    fetch('https://h5-api.itopline.com/v1/circle/getPostDetail', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ post_id: postId })
    })
      .then((response) => response.json())
      .then(({ data }) => {
        resolve(data)
      })
  })
}

function createComment(comment) {
  console.log(comment)
}

function createComments(comments) {
  comments.forEach((comment) => {
    createComment(comment)
  })
}

const getPostComments = (postId) => {
  fetch('https://h5-api.itopline.com/v1/circle/getPostComments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ post_id: postId })
  })
    .then((response) => response.json())
    .then(({ data }) => {
      createComments(data)
    })
}
