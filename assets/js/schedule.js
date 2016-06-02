(function () {

    var scheduleNavigationBtns = document.getElementsByClassName('schedule-navigation-btn');
    var activeScheduleNavigationBtn = scheduleNavigationBtns[0];
    var activeScheduleElement = document.getElementById(scheduleNavigationBtns[0].innerHTML.toLowerCase() + '-schedule');

    var expendScheduleBtns = document.getElementsByClassName('item-dropdown');
    var rsvpBtns = document.getElementsByClassName('rsvp-button');

    for (var i = 0; i < expendScheduleBtns.length; i++) {
        (function () {

            var btn = expendScheduleBtns[i];

            expendScheduleBtns[i].addEventListener('click', function() {
                if(btn.parentNode.className.indexOf('expand') >= 0) {
                    btn.parentNode.className = btn.parentNode.className.replace(' expand', '')
                } else {
                    btn.parentNode.className += ' expand';
                }

            }, false);

        }());
    }

    for (var i = 0; i < rsvpBtns.length; i++) {
        (function () {

            var btn = rsvpBtns[i];

                rsvpBtns[i].addEventListener('click', function() {
                if(btn.parentNode.className.indexOf('active') >= 0) {
                    btn.parentNode.className = btn.parentNode.className.replace(' active', '')
                    btn.innerHTML = '<img src="../assets/img/add-button.svg" alt="">';
                } else {
                    btn.parentNode.className += ' active';
                    btn.innerHTML = '<img src="../assets/img/checked-button.svg" alt="">';
                }

            }, false);

        }());
    }

    loadSchedule(scheduleNavigationBtns[0].innerHTML.toLowerCase());

    for (var i = 0; i < scheduleNavigationBtns.length; i++) {
        (function () {

            var btn = scheduleNavigationBtns[i];
            var agendaName = scheduleNavigationBtns[i].innerHTML.toLowerCase();

            scheduleNavigationBtns[i].addEventListener('click', function() {
                loadSchedule(agendaName);
                var prevScheduleNavigationBtn = activeScheduleNavigationBtn;
                activeScheduleNavigationBtn = btn;
                prevScheduleNavigationBtn.className = prevScheduleNavigationBtn.className.replace(' active', '')
                activeScheduleNavigationBtn.className += ' active';
            }, false);

        }());

        scheduleNavigationBtns[i].addEventListener('click', function() {

        });
    }

    function loadSchedule(agendaName) {
        var prevScheduleElement = activeScheduleElement;
        activeScheduleElement = document.getElementById(agendaName + '-schedule');
        prevScheduleElement.style.display = 'none';
        activeScheduleElement.style.display = 'block';
    }

})()
