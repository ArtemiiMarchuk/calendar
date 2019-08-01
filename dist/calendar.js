addEventListener('DOMContentLoaded', function () {
  var plus_5_days = new Date;
  plus_5_days.setDate(plus_5_days.getDate() + 5);
  pickmeup('.three-calendars', {
    flat      : true,
    date      : new Date,
    mode      : "range",
    calendars : 3,
    format	: 'Y-m-d'
  });
  pickmeup('.onemore-calendars', {
    flat      : true,
    date      : new Date,
    mode      : "range",
    calendars : 3,
    format	: 'Y-m-d'
  });

  Date.prototype.daysInMonth = function() {
		return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
	}

  function formatDate(date) {
    var day = date.getDate();
    if(day < 10){day = "0" + day}
    var month = date.getMonth() + 1;
    if(month < 10){month = "0" + month}
    var year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }

  function calendarWithIntervals(calendarName, sectionId){
    $( sectionId + " button" ).click(function(){
      $( sectionId + ' .nextValue, ' + sectionId + ' .previousValue').val('');
    });

    $( sectionId + " .today" ).click(function() {
      pickmeup(calendarName).set_date([new Date, new Date]);

    });

    $( sectionId + " .yesterday" ).click(function() {
      var yesterday = new Date;
      yesterday.setDate(yesterday.getDate() - 1);
      pickmeup(calendarName).set_date([yesterday, yesterday]);
    });

    $( sectionId + " .weekToDate" ).click(function() {
      var week = new Date;
      week.setDate(week.getDate() - week.getDay() + 1);
      pickmeup(calendarName).set_date([week, new Date]);
    });

    $( sectionId + " .monthToDate" ).click(function() {
      var month = new Date;
      month.setMonth(month.getMonth(),[1]);
      pickmeup(calendarName).set_date([month, new Date]);
    });

    $( sectionId + " .quarterToDate" ).click(function() {
      var quarter = new Date;
      quarter.setMonth((quarter.getMonth() - (quarter.getMonth() % 3)), [1]);
      pickmeup(calendarName).set_date([quarter, new Date]);
    });

    $( sectionId + " .yearToDate" ).click(function() {
      var year = new Date;
      year.setMonth(0, [1]);
      pickmeup(calendarName).set_date([year, new Date]);
    });

    $( sectionId + ' .previous, ' + sectionId + ' .previousValue').on('input', function() {
      var value = $(sectionId + ' .previous').val();
      var number = $(sectionId + ' .previousValue').val();
      if(value != "default" && number.match(/^[-\+]?\d+/) != null && number != 0){
        switch(value) {
          case "days":
            var start = new Date;
            start.setDate(start.getDate() - number);
            var end = new Date;
            end.setDate(end.getDate() - 1);
            pickmeup(calendarName).set_date([start, end]);
            break;
          case "months":
            var start = new Date;
            start.setMonth(start.getMonth() - number,[1]);
            var end = new Date;
            end.setMonth(end.getMonth() - 1, [1]);
            end.setMonth(end.getMonth(),[end.daysInMonth()]);
            pickmeup(calendarName).set_date([start, end]);
            break;
          case "weeks":
            var start = new Date;
            start.setDate(start.getDate() - start.getDay() + 1 - 7 * number);
            var end = new Date;
            end.setDate(end.getDate() - end.getDay())
            pickmeup(calendarName).set_date([start, end]);
            break;
          case "quarters":
            var start = new Date;
            start.setMonth((start.getMonth() - (start.getMonth() % 3)) - 3 * number, [1]);
            var end = new Date;
            end.setMonth(end.getMonth() - (end.getMonth() % 3) - 1, [1]);
            end.setMonth(end.getMonth(),[end.daysInMonth()]);
            pickmeup(calendarName).set_date([start, end]);
            break;
          case "years":
            var start = new Date;
            start.setYear(start.getYear() + 1900 - number);
            start.setMonth(0,[1]);
            var end = new Date;
            end.setYear(end.getYear() + 1900 - 1);
            end.setMonth(11,[31]);
            pickmeup(calendarName).set_date([start, end]);
            break;
        }
      }else{};

    });

    $( sectionId + ' .next, ' + sectionId + ' .nextValue').on('input', function() {
      var value = $(sectionId + ' .next').val();
      var number = $(sectionId + ' .nextValue').val();
      if(value != "default" && number.match(/^[-\+]?\d+/) != null && number != 0){
        switch(value) {
          case "days":
            var start = new Date;
            start.setDate(start.getDate() + 1);
            var end = new Date;
            end.setDate(end.getDate() + +number);
            pickmeup(calendarName).set_date([start, end]);
            break;
          case "months":
            var start = new Date;
            start.setMonth(start.getMonth() + 1,[1]);
            var end = new Date;
            end.setMonth(end.getMonth() + +number, [1]);
            end.setMonth(end.getMonth(),[end.daysInMonth()]);
            pickmeup(calendarName).set_date([start, end]);
            break;
          case "weeks":
            var start = new Date;
            start.setDate(start.getDate() + (7 - start.getDay())  + 1);
            var end = new Date;
            end.setDate(end.getDate() + (7 - end.getDay()) + 7 * number)
            pickmeup(calendarName).set_date([start, end]);
            break;
          case "quarters":
            var start = new Date;
            start.setMonth(start.getMonth() + (start.getMonth() % 3) + 1, [1]);
            var end = new Date;
            end.setMonth((end.getMonth() + (end.getMonth() % 3)) + 3 * number, [1]);
            end.setMonth(end.getMonth(),[end.daysInMonth()]);
            pickmeup(calendarName).set_date([start, end]);
            break;
          case "years":
            var start = new Date;
            start.setYear(start.getYear() + 1900 + 1 );
            start.setMonth(0,[1]);
            var end = new Date;
            end.setYear(end.getYear() + 1900 + +number);
            end.setMonth(11,[31]);
            pickmeup(calendarName).set_date([start, end]);
            break;
        }
      }else{};

    });
  }

  function saveCalendarData(calendarName, calendarId){
    var calendar = {};
    calendar.start = formatDate(pickmeup(calendarName).get_date()[0]);
    calendar.end = formatDate(pickmeup(calendarName).get_date()[1]);
    calendar.period = $(calendarId + ' .rollingPeriod').val();
    calendar.id = calendarId;
    console.log(calendar);
  }

  calendarWithIntervals('.three-calendars', "#calendar-one");

  calendarWithIntervals('.onemore-calendars', '#calendar-two');

  $(".savedataOne").click(function(){
    saveCalendarData('.three-calendars', "#calendar-one");
  });

  $(".savedataTwo").click(function(){
    saveCalendarData('.onemore-calendars', '#calendar-two');
  });

















});
