// Write. home page: intro, scroll and pointer motion, the Mac slideshow, and the try-it editor.
(function () {
  var root = document.documentElement
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  var $ = function (s, el) { return (el || document).querySelector(s) }
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)) }
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)) }

  // ---------------------------------------------------------------- intro
  requestAnimationFrame(function () { requestAnimationFrame(function () { root.classList.add('ready') }) })

  // ---------------------------------------------------------------- reveal on scroll
  var reveals = $$('[data-reveal]')
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })
    reveals.forEach(function (el) { io.observe(el) })
  } else {
    reveals.forEach(function (el) { el.classList.add('in') })
  }

  // ---------------------------------------------------------------- scroll: nav, progress, statements
  var nav = $('#nav')
  var progress = $('#progress')
  var statements = $$('[data-scrub]')
  var scrollQueued = false
  function onScroll() {
    scrollQueued = false
    var y = window.scrollY
    var vh = window.innerHeight
    nav.classList.toggle('scrolled', y > 8)
    var max = document.documentElement.scrollHeight - vh
    progress.style.transform = 'scaleX(' + (max > 0 ? clamp(y / max, 0, 1) : 0) + ')'
    if (!reduce) {
      statements.forEach(function (el) {
        var r = el.getBoundingClientRect()
        el.style.setProperty('--t', clamp((vh * 0.92 - r.top) / (vh * 0.42), 0, 1).toFixed(3))
      })
    }
  }
  window.addEventListener('scroll', function () {
    if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(onScroll) }
  }, { passive: true })
  window.addEventListener('resize', onScroll)
  onScroll()

  // ---------------------------------------------------------------- hero grid spotlight
  var hero = $('#hero')
  if (finePointer && !reduce) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect()
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px')
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px')
      hero.classList.add('lit')
    })
    hero.addEventListener('pointerleave', function () { hero.classList.remove('lit') })
  }

  // ---------------------------------------------------------------- the Mac: tilts up as you scroll, follows the pointer
  var device = $('#device')
  if (device && !reduce) {
    var mouse = { x: 0.5, y: 0.5 }
    var cur = { rx: 22, ry: 0, s: 0.9 }
    var running = false
    var visible = true
    if (finePointer) {
      window.addEventListener('pointermove', function (e) {
        mouse.x = e.clientX / window.innerWidth
        mouse.y = e.clientY / window.innerHeight
      }, { passive: true })
    }
    var frame = function () {
      if (!visible) { running = false; return }
      var r = device.getBoundingClientRect()
      var vh = window.innerHeight
      var p = clamp(1 - (r.top - vh * 0.1) / (vh * 0.72), 0, 1)
      var ease = 1 - Math.pow(1 - p, 2)
      var tx = (1 - ease) * 22 + (finePointer ? (mouse.y - 0.5) * -3 * ease : 0)
      var ty = finePointer ? (mouse.x - 0.5) * 6 * (0.4 + 0.6 * ease) : 0
      var ts = 0.9 + 0.1 * ease
      cur.rx += (tx - cur.rx) * 0.09
      cur.ry += (ty - cur.ry) * 0.09
      cur.s += (ts - cur.s) * 0.09
      device.style.setProperty('--rx', cur.rx.toFixed(3) + 'deg')
      device.style.setProperty('--ry', cur.ry.toFixed(3) + 'deg')
      device.style.setProperty('--s', cur.s.toFixed(4))
      requestAnimationFrame(frame)
    }
    var start = function () { if (!running) { running = true; requestAnimationFrame(frame) } }
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting
        if (visible) start()
      }, { rootMargin: '200px 0px' }).observe(device)
    }
    start()
  }

  // ---------------------------------------------------------------- slideshow
  var slides = $$('#slides .slide')
  var nav2 = $('#slideNav')
  var tabs = $$('button', nav2)
  var ind = $('#slideInd')
  var info = $('#slideInfo')
  var sheen = $('#sheen')
  var idx = 0
  var infoTimer = null
  var reflow = function (el) { return el.offsetWidth }
  // the indicator glides under the active tab, then fills while that screen is showing
  var placeIndicator = function () {
    var t = tabs[idx]
    ind.style.width = t.offsetWidth + 'px'
    ind.style.transform = 'translateX(' + t.offsetLeft + 'px)'
  }
  var runIndicator = function () { ind.classList.remove('run'); reflow(ind); ind.classList.add('run') }
  var setCaption = function () {
    clearTimeout(infoTimer)
    info.classList.remove('enter')
    info.classList.add('leave')
    infoTimer = setTimeout(function () {
      $('h3', info).textContent = tabs[idx].dataset.title
      $('p', info).textContent = tabs[idx].dataset.text
      info.classList.remove('leave')
      info.classList.add('enter')
      reflow(info)
      info.classList.remove('enter')
    }, reduce ? 0 : 300)
  }
  function go(i) {
    var next = (i + slides.length) % slides.length
    if (next === idx) { runIndicator(); return }
    // forward when moving right (or wrapping round to the start), backward otherwise
    var dir = next > idx || (idx === slides.length - 1 && next === 0) ? 1 : -1
    if (idx === 0 && next === slides.length - 1) dir = -1
    var incoming = slides[next]
    var outgoing = slides[idx]
    incoming.style.transition = 'none'
    incoming.style.setProperty('--dir', dir)
    incoming.classList.remove('out')
    reflow(incoming)
    incoming.style.transition = ''
    outgoing.style.setProperty('--dir', dir)
    outgoing.classList.remove('on')
    outgoing.classList.add('out')
    setTimeout(function () { if (!outgoing.classList.contains('on')) outgoing.classList.remove('out') }, 1200)
    incoming.classList.add('on')
    tabs[idx].classList.remove('on')
    tabs[idx].setAttribute('aria-selected', 'false')
    idx = next
    tabs[idx].classList.add('on')
    tabs[idx].setAttribute('aria-selected', 'true')
    placeIndicator()
    runIndicator()
    setCaption()
    if (!reduce) { sheen.classList.remove('go'); reflow(sheen); sheen.classList.add('go') }
    // keep the active tab in view on narrow screens
    var t = tabs[idx]
    if (nav2.scrollWidth > nav2.clientWidth) nav2.scrollTo({ left: t.offsetLeft - nav2.clientWidth / 2 + t.offsetWidth / 2, behavior: 'smooth' })
  }
  tabs.forEach(function (t, i) {
    t.setAttribute('aria-selected', i === 0 ? 'true' : 'false')
    t.addEventListener('click', function () { go(i) })
  })
  placeIndicator()
  runIndicator()
  window.addEventListener('resize', placeIndicator)
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeIndicator)
  // when the line under the active tab is full, move on to the next screen
  ind.addEventListener('animationend', function (e) { if (e.animationName === 'fill') go(idx + 1) })
  var holds = { hover: false, hidden: false, away: false }
  var hold = function (k, v) {
    holds[k] = v
    nav2.classList.toggle('paused', holds.hover || holds.hidden || holds.away)
  }
  $$('.device, .slide-nav').forEach(function (el) {
    el.addEventListener('pointerenter', function () { hold('hover', true) })
    el.addEventListener('pointerleave', function () { hold('hover', false) })
  })
  document.addEventListener('visibilitychange', function () { hold('hidden', document.hidden) })
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) { hold('away', !entries[0].isIntersecting) }, { threshold: 0.25 }).observe($('#slides'))
  }

  // menu bar clock
  var clock = $('#clock')
  var tick = function () {
    var d = new Date()
    clock.textContent = d.toLocaleDateString(undefined, { weekday: 'short' }) + ' ' + d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })
  }
  tick()
  setInterval(tick, 20000)

  // ---------------------------------------------------------------- features flashlight
  var fgrid = $('#fgrid')
  if (fgrid && finePointer && !reduce) {
    fgrid.addEventListener('pointermove', function (e) {
      var r = fgrid.getBoundingClientRect()
      fgrid.style.setProperty('--fx', (e.clientX - r.left) + 'px')
      fgrid.style.setProperty('--fy', (e.clientY - r.top) + 'px')
    })
    fgrid.addEventListener('pointerleave', function () { fgrid.style.setProperty('--fx', '-999px') })
  }

  // ---------------------------------------------------------------- magnetic buttons
  if (finePointer && !reduce) {
    $$('.magnetic').forEach(function (el) {
      el.style.transition = (el.style.transition ? el.style.transition + ', ' : '') + 'transform 0.35s cubic-bezier(0.2, 0.7, 0.1, 1)'
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect()
        var dx = (e.clientX - (r.left + r.width / 2)) * 0.22
        var dy = (e.clientY - (r.top + r.height / 2)) * 0.32
        el.style.transform = 'translate(' + dx.toFixed(1) + 'px,' + dy.toFixed(1) + 'px)'
      })
      el.addEventListener('pointerleave', function () { el.style.transform = '' })
    })
  }

  // ---------------------------------------------------------------- try-it editor
  var page = $('#page')
  if (!page) return
  var tools = $('#tools')
  var style = $('#blockStyle')
  var words = $('#words')
  var saved = $('#saved')
  var lastRange = null
  var savedTimer = null
  var STATES = ['bold', 'italic', 'underline', 'strikeThrough', 'justifyLeft', 'justifyCenter', 'justifyRight', 'insertUnorderedList', 'insertOrderedList']
  try { document.execCommand('defaultParagraphSeparator', false, 'p') } catch (e) {}

  var inPage = function (node) { return node && page.contains(node.nodeType === 3 ? node.parentNode : node) }
  var count = function () {
    var n = (page.innerText || '').trim().split(/\s+/).filter(Boolean).length
    words.textContent = n + (n === 1 ? ' word' : ' words')
  }
  var update = function () {
    var s = window.getSelection()
    if (!s.rangeCount || !inPage(s.anchorNode)) return
    STATES.forEach(function (c) {
      var b = tools.querySelector('[data-cmd="' + c + '"]')
      var on = false
      try { on = document.queryCommandState(c) } catch (e) {}
      if (b) b.classList.toggle('on', on)
    })
    var v = ''
    try { v = String(document.queryCommandValue('formatBlock') || '').toLowerCase().replace(/[<>]/g, '') } catch (e) {}
    style.value = v === 'h1' || v === 'h2' ? v : 'p'
  }
  var focusPage = function () {
    if (document.activeElement === page) return
    page.focus()
    var s = window.getSelection()
    if (lastRange) { s.removeAllRanges(); s.addRange(lastRange); return }
    var r = document.createRange()
    r.selectNodeContents(page)
    r.collapse(false)
    s.removeAllRanges()
    s.addRange(r)
  }

  document.addEventListener('selectionchange', function () {
    var s = window.getSelection()
    if (s.rangeCount && inPage(s.anchorNode)) { lastRange = s.getRangeAt(0).cloneRange(); update() }
  })
  tools.addEventListener('mousedown', function (e) { if (e.target.closest('button')) e.preventDefault() })
  tools.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-cmd]')
    if (!b) return
    focusPage()
    document.execCommand(b.dataset.cmd, false, null)
    update()
    count()
  })
  style.addEventListener('change', function () {
    focusPage()
    document.execCommand('formatBlock', false, '<' + style.value + '>')
    update()
  })

  // Markdown shortcuts: "# ", "## ", "- ", "* " and "1. " at the start of a line
  var markdown = function () {
    var s = window.getSelection()
    if (!s.rangeCount || !s.isCollapsed) return
    var node = s.anchorNode
    if (!node || node.nodeType !== 3) return
    var block = node.parentNode.closest ? node.parentNode.closest('p, h1, h2, li, div') : null
    if (!block || block === page || !page.contains(block)) return
    var before = node.textContent.slice(0, s.anchorOffset).replace(/ /g, ' ')
    var m = /^(#{1,2}|[-*]|1\.) $/.exec(before)
    if (!m || block.textContent.replace(/ /g, ' ').indexOf(before) !== 0) return
    if (block.tagName === 'LI' && m[1] !== '#' && m[1] !== '##') return
    var r = document.createRange()
    r.setStart(node, 0)
    r.setEnd(node, s.anchorOffset)
    s.removeAllRanges()
    s.addRange(r)
    document.execCommand('delete')
    if (m[1] === '#') document.execCommand('formatBlock', false, '<h1>')
    else if (m[1] === '##') document.execCommand('formatBlock', false, '<h2>')
    else if (m[1] === '1.') document.execCommand('insertOrderedList')
    else document.execCommand('insertUnorderedList')
  }

  page.addEventListener('input', function (e) {
    if (e.inputType === 'insertText' && e.data === ' ') markdown()
    count()
    update()
    saved.textContent = 'Saving…'
    clearTimeout(savedTimer)
    savedTimer = setTimeout(function () { saved.textContent = 'Saved to this Mac' }, 700)
  })
  // paste as plain text, like Write.'s "paste without formatting"
  page.addEventListener('paste', function (e) {
    var text = (e.clipboardData || window.clipboardData).getData('text/plain')
    if (!text) return
    e.preventDefault()
    document.execCommand('insertText', false, text)
  })
  count()
})()
