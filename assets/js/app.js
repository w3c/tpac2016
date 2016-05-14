(function () {
    var newsBox = document.getElementById('news-box');
    var newsBoxCloseBtn = document.getElementById('news-box-close-btn');

    newsBoxCloseBtn.addEventListener('click', function() {
        newsBox.style.display = 'none';
    });
})()
