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
  let subComments = ''

  if (comment.replies.length > 0) {
    const list = createSubComments(comment.replies)

    subComments = `
    <div class="sub-comments">
      <div class="list">${list}</div>
    </div>
    `
  }

  return `
  <div class="comment">
    <img src="${comment.user_info.avatar_text}" 
      onerror="this.src='${DEFAULT_AVATAR}'; this.onerror=null;"
      class="user-avatar" />

    <div class="right">
      <div class="nickname">${comment.user_info.user_nickname}</div>
      <div class="content">${comment.content}</div>
    </div>
  </div>

  ${subComments}
  `
}

function createSubComment(reply) {
  const nickname = reply.user_info.user_nickname
  const toNickname = reply.reply_to_user.user_nickname

  return `
  <div><span class="nickname">${nickname}</span>：<span class="content">${reply.content}</span></div>
  `
}

function createSubComments(replies) {
  const MAX_DISPLAY = 3
  let html = ''

  const displayedReplies = replies.slice(0, MAX_DISPLAY)
  displayedReplies.forEach((reply) => {
    html += createSubComment(reply)
  })

  if (replies.length > MAX_DISPLAY) {
    html += `
      <div class="more">
        在APP内查看更多评论
      </div>
    `
  }

  return html
}

function createComments(commentsDom, comments) {
  let html = ''

  comments.forEach((comment) => {
    html += createComment(comment)
  })

  commentsDom.innerHTML = html
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
      createComments(document.querySelector('.comments'), data)
    })
}
