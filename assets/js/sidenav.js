(function () {
  var sideNav = document.getElementById('side-nav')
  var sideNavBtn = document.getElementById('side-nav-btn')
  var mask = document.getElementById('mask')

  sideNavBtn.addEventListener('click', function () {
    mask.className += ' active'
    sideNav.className += ' active'
  })

  mask.addEventListener('click', function () {
    mask.className = mask.className.replace('active', 'hidden')
    sideNav.className = sideNav.className.replace('active', 'hidden')
  })
})()
