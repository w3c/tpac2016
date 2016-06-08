(function () {

    if(!localStorage.myMeetings) {
        localStorage.setItem("myMeetings", "[]");

    }

    var scheduleNavigationBtns = document.getElementsByClassName('schedule-navigation-btn');
    var activeScheduleNavigationBtn = scheduleNavigationBtns[5];
    var activeScheduleElement = document.getElementById(scheduleNavigationBtns[5].innerHTML.toLowerCase().replace(' ', '') + '-schedule');

    var expendScheduleBtns = document.getElementsByClassName('item-dropdown');
    var rsvpBtns;

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



    loadSchedule(scheduleNavigationBtns[5].innerHTML.toLowerCase().replace(' ', ''));

    for (var i = 0; i < scheduleNavigationBtns.length; i++) {
        (function () {

            var btn = scheduleNavigationBtns[i];
            var agendaName = scheduleNavigationBtns[i].innerHTML.toLowerCase();
            agendaName = agendaName.replace(' ', '');
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

    function scheduleSavedMotification() {
        var meetings = JSON.parse(localStorage.getItem("myMeetings"));
        var n = meetings.length + 1;
        console.log(n);
    }

    function loadMySchedules(wgMeetings) {
        var index = 'monday';
        var mySchedules = document.getElementById('myschedule-schedule');
        for(var i in wgMeetings[index]) {
            var currentMeeting = wgMeetings[i];
            var buffer = '<li id="' + index + wgMeetings[index][i].wg.replace(/ /g,'') + '">'
            + '<p class="meeting-name">'    +    wgMeetings[index][i].wg   +    ' </p>'
            + '<p class="meeting-location"> Room <br>' + wgMeetings[index][i].room + '</p>'
            + '<p class="meeting-info">' + ' Observers allowed ' + '</p>'
            + '<button class="rsvp-button" data-id="' + index + wgMeetings[index][i].wg.replace(/ /g,'') + '"><img src="../assets/img/add-button.svg" alt=""></button>'
            + '</li>';
            try {
                document.getElementById('myschedule-monday').innerHTML += buffer;
            } catch (e) {
                console.log('error whith' + index + '-wg-meetings:' + e);
            }

        }

    }

    function loadGroupMeetings(wgMeetings) {

        for(var index in wgMeetings) {
            var currentDay = index;
            for(var i in wgMeetings[index]) {
                var currentMeeting = wgMeetings[i];
                var buffer = '<li id="' + index + wgMeetings[index][i].wg.replace(/ /g,'') + '">'
                + '<p class="meeting-name">'    +    wgMeetings[index][i].wg   +    ' </p>'
                + '<p class="meeting-location"> Room <br>' + wgMeetings[index][i].room + '</p>'
                + '<p class="meeting-info">' + ' Observers allowed ' + '</p>'
                + '<button class="rsvp-button" data-id="' + index + wgMeetings[index][i].wg.replace(/ /g,'') + '"><img src="../assets/img/add-button.svg" alt=""></button>'
                + '</li>';
                console.log(index);
                try {
                    document.getElementById(index + '-wg-meetings').innerHTML += buffer;
                } catch (e) {
                    console.log('error whith' + index + '-wg-meetings:' + e);
                }

            }

        }

        rsvpBtns = document.getElementsByClassName('rsvp-button');

        for (var i = 0; i < rsvpBtns.length; i++) {
            (function () {

                var btn = rsvpBtns[i];

                    rsvpBtns[i].addEventListener('click', function() {


                    if(btn.parentNode.className.indexOf('active') >= 0) {
                        var meetings = JSON.parse(localStorage.getItem("myMeetings"));
                        for(var k in meetings) {
                            if(meetings[k] === btn.dataset.id) {
                                meetings.splice(k, 1);
                            }
                        }

                        localStorage.myMeetings = JSON.stringify(meetings);
                        btn.parentNode.className = btn.parentNode.className.replace(' active', '')
                        btn.innerHTML = '<img src="../assets/img/add-button.svg" alt="">';
                    } else {

                            var meetings = JSON.parse(localStorage.getItem("myMeetings"));
                        meetings.push(btn.dataset.id);
                        scheduleSavedMotification();
                        localStorage.myMeetings = JSON.stringify(meetings);
                        btn.parentNode.className += ' active';
                        btn.innerHTML = '<img src="../assets/img/checked-button.svg" alt="">';

                    }
                    console.log(localStorage.myMeetings);
                }, false);

            }());
        }


        var myScheduledMeetings = JSON.parse(localStorage.getItem("myMeetings"));

        for (var i in myScheduledMeetings) {
            console.log(myScheduledMeetings[i]);
            var selectedSchedule = document.getElementById(myScheduledMeetings[i]);
            var buttonSelectedSchedule = selectedSchedule.getElementsByTagName("button")[0];

            selectedSchedule.className += ' active';
            buttonSelectedSchedule.innerHTML = '<img src="../assets/img/checked-button.svg" alt="">';

        }
    }

    function get(url, callback) {
        httpRequest = new XMLHttpRequest();

        if (!httpRequest) {
            console.log('Giving up :( Cannot create an XMLHTTP instance');
            return false;
        }
        httpRequest.onreadystatechange = callback;
        httpRequest.open('GET', url);
        httpRequest.send();
    }

    window.onload = function() {

        var projects = {};

        console.log(localStorage.myMeetings);

        get('../data/wg-schedule.json', function(){

            if (httpRequest.readyState === XMLHttpRequest.DONE) {

                if (httpRequest.status === 200) {

                    var wgMeetings = JSON.parse(httpRequest.responseText);
                    loadGroupMeetings(wgMeetings);
                    loadMySchedules(wgMeetings);

                } else {
                    console.log('something went wrong with the request');
                }

            }
        });

    }


})()
