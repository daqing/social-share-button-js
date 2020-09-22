const WeChat = require("./src/wechat.js")

module.exports = function(el) {
  if (el.getAttribute == null) {
    el = document.querySelector(el)
  }

  const site = el.getAttribute("data-site")
  const appkey = el.getAttribute("data-appkey") || ''
  const $parent = el.parentNode
  const title = encodeURIComponent(el.getAttribute("data-" + site + "-title") || $parent.getAttribute('data-title') || '')
  const img = encodeURIComponent($parent.getAttribute("data-img") || '')
  let url = encodeURIComponent($parent.getAttribute("data-url") || '')
  const via = encodeURIComponent($parent.getAttribute("data-via") || '')
  const desc = encodeURIComponent($parent.getAttribute("data-desc") || ' ')

  // tracking click events if google analytics enabled
  const ga = window[window['GoogleAnalyticsObject'] || 'ga']
  if (typeof(ga) == 'function') {
    ga('send', 'event', 'Social Share Button', 'click', site)
  }

  if (url.length == 0) {
    url = encodeURIComponent(location.href)
  }

  switch (site) {
    case "email":
      location.href = `mailto:?to=&subject=${title}&body=${url}`
      break
    case "weibo":
      openUrl(`http://service.weibo.com/share/share.php?url=${url}&type=3&pic=${img}&title=${title}&appkey=${appkey}`, 620, 370)
      break
    case "twitter":
      const hashtags = encodeURIComponent(el.getAttribute("data-" + site + "-hashtags") || $parent.getAttribute("data-hashtags") || '')
      let via_str = ''
      if (via.length > 0) {
        via_str = `&via=${via}` 
      }
      openUrl(`https://twitter.com/intent/tweet?url=${url}&text=${title}&hashtags=${hashtags}${via_str}`, 650, 300)
      break
    case "douban":
      openUrl(`http://shuo.douban.com/!service/share?href=${url}&name=${title}&image=${img}&sel=${desc}`, 770, 470)
      break
    case "facebook":
      openUrl(`http://www.facebook.com/sharer/sharer.php?u=${url}`, 555, 400)
      break
    case "qq":
      openUrl(`http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&pics=${img}&summary=${desc}&site=${appkey}`)
      break
    case "google_bookmark":
      openUrl(`https://www.google.com/bookmarks/mark?op=edit&output=popup&bkmk=${url}&title=${title}`)
      break
    case "delicious":
      openUrl(`https://del.icio.us/save?url=${url}&title=${title}&jump=yes&pic=${img}`)
      break
    case "pinterest":
      openUrl(`http://www.pinterest.com/pin/create/button/?url=${url}&media=${img}&description=${title}`)
      break
    case "linkedin":
      openUrl(`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}&summary=${desc}`)
      break
    case "xing":
      openUrl(`https://www.xing.com/spi/shares/new?url=${url}`)
      break
    case "vkontakte":
      openUrl(`http://vk.com/share.php?url=${url}&title=${title}&image=${img}`)
      break
    case "odnoklassniki":
      openUrl(`https://connect.ok.ru/offer?url=${url}&title=${title}&description=${desc}&imageUrl=${img}`)
      break
    case "wechat":
      WeChat({
        url: decodeURIComponent(url),
        header: el.getAttribute('title'),
        footer: el.getAttribute("data-wechat-footer"),
      })

      break
    case "reddit":
      openUrl(`http://www.reddit.com/submit?url=${url}&newwindow=1`, 555, 400)
      break
    case "hacker_news":
      openUrl(`http://news.ycombinator.com/submitlink?u=${url}&t=${title}`, 770, 500)
      break
    case "telegram":
      openUrl(`https://telegram.me/share/url?text=${title}&url=${url}`)
      break
  }

  return false
}

function openUrl(url, width = 640, height = 480) {
  const left = (screen.width / 2) - (width / 2)
  const top = (screen.height * 0.3) - (height / 2)
  const opt = `width=${width},height=${height},left=${left},top=${top},menubar=no,status=no,location=no`
  window.open(url, 'popup', opt)
  return false
}

