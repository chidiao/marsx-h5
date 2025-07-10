// config
const DEFAULT_AVATAR = 'https://miniapp-static.itopline.com/storage/default/avatar.png'
const DOWNLOAD_URL_ANDROID = 'https://ai-share.itopline.com/download.php?p=android'
const DOWNLOAD_URL_IOS = 'https://ai-share.itopline.com/download.php?p=ios'

function toDownload() {
  const os = detectMobileOS()

  window.open(os == 'ios' ? DOWNLOAD_URL_IOS : DOWNLOAD_URL_ANDROID)
}

function onDownload() {
  toDownload()
}

function onShowMore() {
  toDownload()
}

document.querySelector('.chat-btn')?.addEventListener('click', onDownload)
document.querySelector('.download-btn .btn').addEventListener('click', onDownload)

// 占位
const plcDom = document.createElement('div')
plcDom.className = 'download-btn-plc'
document.querySelector('.download-btn').insertAdjacentElement('afterend', plcDom)

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

function detectMobileOS() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (/iPad|iPhone|iPod/.test(userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
    return 'ios'
  }

  if (/android/i.test(userAgent)) {
    return 'android'
  }

  return undefined
}
