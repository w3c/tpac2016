(function () {
  localStorage.removeItem('mySchedule')
  var myScheduleElement = document.getElementById('myschedule')
  var mySchedule = JSON.stringify([
    {
      "id": "",
      "date": "",
      "day": "monday",
      "name": "Web Platform Working Group",
      "start": "8:30am",
      "end": "6:30pm",
      "room": "G320",
      "description": ""
    },
    {
      "id": "",
      "date": "",
      "day": "monday",
      "name": "Web Platform Working Group",
      "start": "8:30am",
      "end": "6:30pm",
      "room": "G320",
      "description": ""
    },
    {
      "id": "",
      "date": "",
      "day": "tuesday",
      "name": "Web Platform Working Group",
      "start": "8:30am",
      "end": "6:30pm",
      "room": "G320",
      "description": ""
    },
    {
      "id": "",
      "date": "",
      "day": "thursday",
      "name": "Web Platform Working Group",
      "start": "8:30am",
      "end": "6:30pm",
      "room": "G320",
      "description": ""
    },
    {
      "id": "",
      "date": "",
      "day": "friday",
      "name": "Web Platform Working Group",
      "start": "8:30am",
      "end": "6:30pm",
      "room": "G320",
      "description": ""
    },
    {
      "id": "",
      "date": "",
      "day": "friday",
      "name": "Web Platform Working Group",
      "start": "8:30am",
      "end": "6:30pm",
      "room": "G320",
      "description": ""
    }
  ])
  //localStorage.setItem("mySchedule", mySchedule)
  function hideElement(element) {
    element.style.display = 'none'
  }
  function displayElement(element) {
    element.style.display = ''
  }
  function addMeeting(meeting) {
    document.getElementById('my-schedule-' + meeting.day).innerHTML += '<li class="meeting">' +
    '<div class="meeting-time">' +
    '<p>' + meeting.start + '<br>' + '<span>' + meeting.end + '</span></p>' +
    '</div>' +
    '<div class="meeting-name">' +
    '<p>' + meeting.name + '</p>' +
    '</div>' +
    '<button type="button" name="expand"><img src="assets/img/dropdown-arrow.svg" height="25" alt=""></button>' +
    '</li>'
  }

  if(localStorage.mySchedule) {
    hideElement(document.getElementById('my-schedule-placeholder'))
    displayElement(document.getElementById('my-schedule-list'))
    for (var i in JSON.parse(localStorage.mySchedule)) {
      addMeeting(JSON.parse(localStorage.mySchedule)[i])
    }
  } else {
    displayElement(document.getElementById('my-schedule-placeholder'))
    hideElement(document.getElementById('my-schedule-list'))
  }


})()
