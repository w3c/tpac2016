(function () {

    var scheduleNavigationBtns = document.getElementsByClassName('schedule-navigation-btn');
    var activeScheduleNavigationBtn = scheduleNavigationBtns[0];
    var activeScheduleElement = document.getElementById(scheduleNavigationBtns[0].innerHTML.toLowerCase() + '-schedule');
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
