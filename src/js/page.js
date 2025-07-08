function createTag(tag, isZodiac = false) {
  const tagElement = document.createElement('span')
  tagElement.textContent = tag
  tagElement.className = isZodiac ? 'tag zodiac' : 'tag'

  return tagElement
}

function setUserBackground(userData) {
  const bgDom = document.querySelector('.top-bg')
  bgDom.style.backgroundImage = `url('${userData.background_image_text}')`
}

function setUserCounts(userData) {
  const countDoms = document.querySelectorAll('.count')
  countDoms[0].innerHTML = userData.following_count
  countDoms[1].innerHTML = userData.follower_count
  countDoms[2].innerHTML = userData.post_count
  countDoms[3].innerHTML = userData.total_likes_count
}

function setUserInfo(userData) {
  const avatarDom = document.querySelector('.avatar')
  avatarDom.style.backgroundImage = `url('${userData.avatar_text}')`

  document.querySelector('.nickname').innerHTML = userData.user_nickname
  document.querySelector('.uid').innerHTML = '火星身份证号：' + userData.uid
  document.querySelector('.signature').innerHTML = userData.signature
}

function setUserTags(userData) {
  const tagsDom = document.querySelector('.tags')
  tagsDom.appendChild(createTag(userData.zodiac, true))
  userData.tags.forEach((tag) => {
    tagsDom.appendChild(createTag(tag))
  })
}

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
      setUserBackground(data)
      setUserCounts(data)
      setUserInfo(data)
      setUserTags(data)
    })
}

function createPost(post) {
  let tags = ''
  let imgs = ''

  post.user_info.tags.forEach((tag) => {
    tags += `<span class="tag">${tag}</span>`
  })

  post.images.forEach((img) => {
    imgs += `<img src="${img}" class="post-img " />`
  })

  const content = post.content.replace(/\n/g, '<br>')

  return `
  <div class="post">
    <div class="post-header">
      <img src="${post.user_info.avatar_text}" 
        onerror="this.src='${DEFAULT_AVATAR}'; this.onerror=null;"
        class="post-avatar" />

      <div class="post-right">
        <div class="nickname">${post.user_info.user_nickname}</div>
        <div class="tags">${tags}</div>
      </div>
    </div>

    <div class="post-main">
      <div class="post-content">${content}</div>
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

function createPosts(postsDom, posts) {
  let html = ''

  posts.forEach((post) => {
    html += createPost(post)
  })

  postsDom.innerHTML = html
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
      createPosts(document.querySelector('.posts'), data)
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
      createPosts(document.querySelector('.likes'), data)
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
