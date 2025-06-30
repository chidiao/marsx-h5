const getUserData = (userId) => {
  fetch('https://h5-api.itopline.com/v1/circle/getUserProfile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: userId })
  })
    .then((response) => response.json())
    .then(({ data }) => {
      // bg
      const bgDom = document.querySelector('.top-bg')
      bgDom.style.backgroundImage = `url('${data.background_image_text}')`

      // avatar
      const avatarDom = document.querySelector('.avatar')
      avatarDom.style.backgroundImage = `url('${data.avatar_text}')`

      // counts
      const countDoms = document.querySelectorAll('.count')
      countDoms[0].innerHTML = data.following_count
      countDoms[1].innerHTML = data.follower_count
      countDoms[2].innerHTML = data.post_count
      countDoms[3].innerHTML = data.total_likes_count

      // info
      document.querySelector('.nickname').innerHTML = data.user_nickname
      document.querySelector('.uid').innerHTML = '火星身份证号：' + data.uid
      document.querySelector('.signature').innerHTML = data.signature

      // tags
      const tagsDom = document.querySelector('.tags')

      const tagElement = document.createElement('span')
      tagElement.textContent = data.zodiac
      tagElement.className = 'tag zodiac'
      tagsDom.appendChild(tagElement)

      data.tags.forEach((tag) => {
        const tagElement = document.createElement('span')
        tagElement.textContent = tag
        tagElement.className = 'tag'
        tagsDom.appendChild(tagElement)
      })
    })
}

const createPost = (post) => {
  let tags = ''
  let imgs = ''

  post.user_info.tags.forEach((tag) => {
    tags += `<span class="tag">${tag}</span>`
  })

  post.images.forEach((img) => {
    imgs += `<img src="${img}" class="post-img " />`
  })

  return `
  <div class="post">
    <div class="post-header">
      <img src="${post.user_info.avatar_text}" class="post-avatar " />
      <div class="post-right">
        <div>${post.user_info.user_nickname}</div>
        <div class="tags">${tags}</div>
      </div>
    </div>

    <div class="post-main">
      <div class="post-content">${post.content}</div>
      <div class="post-imgs">${imgs}</div>
      <div class="post-bottom">
        <div class="post-date">${post.created_at_text}</div>
        <div class="post-count">${post.like_count}</div>
        <div class="post-count">${post.comment_count}</div>
      </div>
    </div>
  </div>
  `
}

const getUserPosts = (userId) => {
  fetch('https://h5-api.itopline.com/v1/circle/getUserPosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: userId })
  })
    .then((response) => response.json())
    .then(({ data }) => {
      let html = ''

      data.forEach((post) => {
        html += createPost(post)
      })

      const postsDom = document.querySelector('.posts')
      postsDom.innerHTML = html
    })
}

const getUserLikes = (userId) => {
  fetch('https://h5-api.itopline.com/v1/circle/getUserLikedPosts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ user_id: userId })
  })
    .then((response) => response.json())
    .then(({ data }) => {
      let html = ''

      data.forEach((post) => {
        html += createPost(post)
      })

      const postsDom = document.querySelector('.likes')
      postsDom.innerHTML = html
    })
}

const initTabs = () => {
  const tabs = document.querySelectorAll('.tabs .tab')
  const postsDom = document.querySelector('.posts')
  const likessDom = document.querySelector('.likes')

  const removeAll = () => {
    tabs.forEach((tab) => {
      tab.classList.remove('active')
    })

    postsDom.classList.remove('active')
    likessDom.classList.remove('active')
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const index = tab.dataset.index

      removeAll()

      tab.classList.add('active')

      if (index == 0) {
        postsDom.classList.add('active')
      } else {
        likessDom.classList.add('active')
      }
    })
  })
}
