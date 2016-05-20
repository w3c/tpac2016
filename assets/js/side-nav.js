(function () {

    var sideNav = document.getElementById('side-nav');
    var sideNavBtn = document.getElementById('side-nav-btn');
    var sideNavOverlay = document.getElementById('side-nav-overlay');
    var sideNavContent = document.getElementById('side-nav-content');

    sideNavBtn.addEventListener('click', function() {
        sideNavOverlay.className += ' active';
        sideNavContent.className += ' active';
    });

    sideNavOverlay.addEventListener('click', function() {
        sideNavOverlay.className = sideNavOverlay.className.replace('active', 'hidden');
        sideNavContent.className = sideNavContent.className.replace('active', 'hidden');
    });

    sideNavContent.addEventListener('click', function() {

    });

})()
