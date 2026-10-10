// Write. download buttons. They start the installer right from the page and show a short note
// about opening it for the first time. Used by the home page and the install guide.
(function () {
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)) }
  // The buttons start the download right here. Until the newest version is looked up,
  // they use the file below (keep it in step with each release).
  var DOWNLOAD = {
    file: 'https://github.com/subhodeep2002/Write/releases/download/v1.1.0/Write-1.1.0-arm64.dmg',
    latest: 'https://api.github.com/repos/subhodeep2002/Write/releases/latest',
  }
  $$('[data-download]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault()
      window.location.href = DOWNLOAD.file
      notice()
    })
  })
  // a small note at the bottom while the file comes in, with a pointer to the install guide
  var noticeEl = null
  var noticeTimer = null
  function notice() {
    if (!noticeEl) {
      noticeEl = document.createElement('div')
      noticeEl.className = 'dl-note'
      noticeEl.setAttribute('role', 'status')
      noticeEl.innerHTML = '<span>Your download is starting</span><a href="install.html#first-open">How to open it the first time</a>'
      document.body.appendChild(noticeEl)
    }
    reflowNote()
    noticeEl.classList.add('show')
    clearTimeout(noticeTimer)
    noticeTimer = setTimeout(function () { noticeEl.classList.remove('show') }, 12000)
  }
  function reflowNote() { return noticeEl.offsetWidth }
  fetch(DOWNLOAD.latest, { headers: { Accept: 'application/vnd.github+json' } })
    .then(function (r) { return r.ok ? r.json() : null })
    .then(function (d) {
      if (!d) return
      var dmg = (d.assets || []).filter(function (a) { return /\.dmg$/i.test(a.name) })[0]
      var v = String(d.tag_name || '').replace(/^v/i, '')
      if (dmg) {
        DOWNLOAD.file = dmg.browser_download_url
        var mb = 'About ' + Math.round(dmg.size / 1e7) * 10 + ' MB'
        $$('[data-size], [data-size-plain]').forEach(function (el) { el.textContent = mb })
      }
      if (/^\d+(\.\d+)*$/.test(v)) {
        $$('[data-version]').forEach(function (el) { el.textContent = 'Version ' + v })
        $$('[data-version-plain]').forEach(function (el) { el.textContent = v })
      }
    })
    .catch(function () {})

})()
