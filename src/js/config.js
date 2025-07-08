// config
const DEFAULT_AVATAR = 'https://miniapp-static.itopline.com/storage/default/avatar.png'

function onDownload() {
  alert('敬请期待')
}

function onShowMore() {
  alert('敬请期待')
}

document.querySelector('.download-btn .btn').addEventListener('click', onDownload)

document.querySelector('.comments').addEventListener('click', (e) => {
  if (e.target.classList.contains('more')) {
    onShowMore()
  }
})

// utils
function getParams(name) {
  const urlParams = new URLSearchParams(window.location.search)

  return urlParams.get(name)
}
