// Shows Google's file picker for Write. and sends the chosen documents back to the app.
// Write. opens this page with everything it needs after the "#", which browsers never send to
// a server. The token is read once and removed from the address bar right away.
(function () {
  var params = new URLSearchParams(location.hash.slice(1))
  history.replaceState(null, '', location.pathname)

  var token = params.get('token')
  var key = params.get('key')
  var appId = params.get('app')
  var back = params.get('return') || ''
  var state = params.get('state') || ''
  var multi = params.get('multi') === '1'
  // set when Write. asks for access to one document it is already linked to
  var ids = /^[\w,-]+$/.test(params.get('ids') || '') ? params.get('ids') : ''
  // Only ever hand results back to Write. on this Mac
  var validBack = /^http:\/\/127\.0\.0\.1:\d{2,5}\/picked$/.test(back)

  var $ = function (id) { return document.getElementById(id) }
  function show(title, msg, opts) {
    opts = opts || {}
    $('title').textContent = title
    $('msg').textContent = msg
    $('spin').hidden = !opts.busy
  }
  function returnTo(query) {
    var url = back + '?state=' + encodeURIComponent(state) + '&' + query
    $('back').href = url
    $('back').hidden = false
    location.replace(url)
  }

  var picker = null
  function build() {
    var MIME = 'application/vnd.google-apps.document'
    var mine = new google.picker.DocsView(google.picker.ViewId.DOCUMENTS)
      .setMimeTypes(MIME)
      .setMode(google.picker.DocsViewMode.LIST)
    var drives = new google.picker.DocsView(google.picker.ViewId.DOCUMENTS)
      .setMimeTypes(MIME)
      .setMode(google.picker.DocsViewMode.LIST)
      .setEnableDrives(true)
    var builder = new google.picker.PickerBuilder()
      .setAppId(appId)
      .setOAuthToken(token)
      .setDeveloperKey(key)
      .enableFeature(google.picker.Feature.SUPPORT_DRIVES)
      .setCallback(onPicked)
    if (ids) {
      builder.addView(mine.setFileIds(ids)).setTitle('Select this document and click Select to give Write. access')
    } else {
      builder.addView(mine).addView(drives).setTitle(multi ? 'Choose Google Docs for Write.' : 'Choose a Google Doc for Write.')
    }
    if (multi) builder.enableFeature(google.picker.Feature.MULTISELECT_ENABLED)
    picker = builder.build()
    picker.setVisible(true)
    show('Choose your documents', 'Pick them in Google’s window.', {})
  }

  function onPicked(data) {
    var action = data[google.picker.Response.ACTION]
    if (action === google.picker.Action.PICKED) {
      var files = (data[google.picker.Response.DOCUMENTS] || []).slice(0, 50).map(function (d) {
        return { id: d[google.picker.Document.ID], name: String(d[google.picker.Document.NAME] || '').slice(0, 200) }
      })
      show('Done', 'Sending your choice to Write.…', { busy: true })
      returnTo('files=' + encodeURIComponent(JSON.stringify(files)))
    } else if (action === google.picker.Action.CANCEL) {
      show('Nothing was chosen', 'You can close this tab.', {})
      returnTo('cancel=1')
    }
  }

  window.writePickerStart = function () {
    if (!token || !key || !appId || !validBack) {
      show('Open this from Write.', 'In Write., click Import from Google Docs. This page opens by itself and shows your documents.', {})
      return
    }
    gapi.load('picker', { callback: build, onerror: window.writePickerFailed })
  }
  window.writePickerFailed = function () {
    show('Couldn’t load Google’s file picker', 'Check your internet connection, then try again from Write.', {})
    if (validBack) returnTo('cancel=1')
  }
})()
