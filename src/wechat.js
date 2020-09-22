require("jquery")
require("./jquery.qrcode.min.js")

module.exports = function(opts={}) {
  if ($("#ss-wechat-dialog").length == 0) {
    init(opts)
    bindEvents()
  }

  const $wBody = $('#ss-wechat-dialog-qr')
  $wBody.empty()
  $wBody.qrcode({
    width: 200,
    height: 200,
    text: opts.url,
  })

  const $wContainer = $("#ss-wechat-dialog")
  let top = ($(window).height() - $wContainer.height()) / 2
  if (top < 100) {
    top = 100
  }
  const left = ($(window).width() - $wContainer.width()) / 2

  $wContainer.css({
   top: top,
   left: left,
  })

  $wContainer.show()
}

function init(opts) {
  const dialog = `<div id='ss-wechat-dialog' class='ss-wechat-dialog'>
                    <div class='wechat-popup-header'>
                      <span>${opts.header}</span>
                      <a href='#' onclick='return false;' class='wechat-popup-close'>×</a>
                    </div>
                    <div id='ss-wechat-dialog-qr' class='wechat-dialog-qr'></div>
                    <div class='wechat-popup-footer'>
                      ${opts.footer}
                    </div>
                  </div>`

  $("body").append(dialog)
}

function bindEvents() {
  $wContainer = $("#ss-wechat-dialog")
  $wContainer.find(".wechat-popup-close").on("click", function(e) {
    $wContainer.hide()
  })
}
