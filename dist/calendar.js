addEventListener('DOMContentLoaded', function () {
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
    let day = date.getDate();
    day = (day < 10) ? '0' + day : day;
    let month = date.getMonth() + 1;
    month = (month < 10) ? '0' + month : month;
    let year = date.getFullYear();

    return year + '-' + month + '-' + day;
  }

  class Calendar {
    constructor(calendar,number) {
      this.calendar = calendar;
      this.number = +number;
      this.end = new Date;
      this.start = new Date;
    }

    previousDay(){
      this.start.setDate(this.start.getDate() - this.number);
      this.end.setDate(this.end.getDate() - 1);
      this.setCalendar();
    }

    previousMonth(){
      this.start.setMonth(this.start.getMonth() - this.number,[1]);
      this.end.setMonth(this.end.getMonth() - 1, [1]);
      this.end.setMonth(this.end.getMonth(),[this.end.daysInMonth()]);
      this.setCalendar();
    }

    previousWeek(){
      this.start.setDate(this.start.getDate() - this.start.getDay() + 1 - 7 * this.number);
      this.end.setDate(this.end.getDate() - this.end.getDay());
      this.setCalendar();
    }

    previousQuarter(){
      this.start.setMonth((this.start.getMonth() - (this.start.getMonth() % 3)) - 3 * this.number, [1]);
      this.end.setMonth(this.end.getMonth() - (this.end.getMonth() % 3) - 1, [1]);
      this.end.setMonth(this.end.getMonth(),[this.end.daysInMonth()]);
      this.setCalendar();
    }

    previousYear(){
      this.start.setYear(this.start.getYear() + 1900 - this.number);
      this.start.setMonth(0,[1]);
      this.end.setYear(this.end.getYear() + 1900 - 1);
      this.end.setMonth(11,[31]);
      this.setCalendar();
    }

    nextDay(){
      this.start.setDate(this.start.getDate() + 1);
      this.end.setDate(this.end.getDate() + this.number);
      this.setCalendar();
    }

    nextMonth(){
      this.start.setMonth(this.start.getMonth() + 1,[1]);
      this.end.setMonth(this.end.getMonth() + this.number, [1]);
      this.end.setMonth(this.end.getMonth(),[this.end.daysInMonth()]);
      this.setCalendar();
    }

    nextWeek(){
      this.start.setDate(this.start.getDate() + (7 - this.start.getDay())  + 1);
      this.end.setDate(this.end.getDate() + (7 - this.end.getDay()) + 7 * this.number);
      this.setCalendar();
    }

    nextQuarter(){
      this.start.setMonth(this.start.getMonth() + (this.start.getMonth() % 3) + 1, [1]);
      this.end.setMonth((this.end.getMonth() + (this.end.getMonth() % 3)) + 3 * this.number, [1]);
      this.end.setMonth(this.end.getMonth(),[this.end.daysInMonth()]);
      this.setCalendar();
    }

    nextYear(){
      this.start.setYear(this.start.getYear() + 1900 + 1 );
      this.start.setMonth(0,[1]);
      this.end.setYear(this.end.getYear() + 1900 + this.number);
      this.end.setMonth(11,[31]);
      this.setCalendar();
    }

    setCalendar() {
      pickmeup(this.calendar).set_date([this.start, this.end]);
    }

    static today(calendarName){
      pickmeup(calendarName).set_date(new Date);
    }

    static yesterday(calendarName){
      pickmeup(calendarName).set_date(new Date().setDate(new Date().getDate() - 1));
    }

    static weekToDate(calendarName){
      let now = new Date;
      pickmeup(calendarName).set_date([now.setDate(now.getDate() - now.getDay() + 1), new Date]);
    }

    static monthToDate(calendarName){
      pickmeup(calendarName).set_date([new Date().setMonth(new Date().getMonth(),[1]), new Date]);
    }

    static quarterToDate(calendarName){
      let now = new Date;
      pickmeup(calendarName).set_date([now.setMonth(now.getMonth() - (now.getMonth() % 3),[1]), new Date]);
    }

    static yearToDate(calendarName){
      pickmeup(calendarName).set_date([new Date().setMonth(0,[1]), new Date]);
    }
  }

  function calendarWithIntervals(calendarName, sectionId){

    $( sectionId + " button" ).click(function(){

      switch ($(this).attr('class')) {
        case 'today':
          Calendar.today(calendarName);
          break;
        case 'yesterday':
          Calendar.yesterday(calendarName);
          break;
        case 'weekToDate':
          Calendar.weekToDate(calendarName);
          break;
        case 'monthToDate':
          Calendar.monthToDate(calendarName);
          break;
        case 'quarterToDate':
          Calendar.quarterToDate(calendarName);
          break;
        case 'yearToDate':
          Calendar.yearToDate(calendarName);
          break;
        default:
      }
    });

    $( sectionId + ' .previous, ' + sectionId + ' .previousValue').on('input', function() {
      let typeOfInterval = $(sectionId + ' .previous').val();
      let number = $(sectionId + ' .previousValue').val();
      if(typeOfInterval != "default" && number.match(/^[-\+]?\d+/) != null && number != 0){

        let calendar = new Calendar(calendarName,number);

        switch(typeOfInterval) {
          case "days":
            calendar.previousDay();
            break;
          case "months":
            calendar.previousMonth();
            break;
          case "weeks":
            calendar.previousWeek();
            break;
          case "quarters":
            calendar.previousQuarter();
            break;
          case "years":
            calendar.previousYear();
            break;
        }
      }

    });

    $( sectionId + ' .next, ' + sectionId + ' .nextValue').on('input', function() {
      let typeOfInterval = $(sectionId + ' .next').val();
      let number = $(sectionId + ' .nextValue').val();
      if(typeOfInterval != "default" && number.match(/^[-\+]?\d+/) != null && number != 0){

        let calendar = new Calendar(calendarName,number);

        switch(typeOfInterval) {
          case "days":
            calendar.nextDay();
            break;
          case "months":
            calendar.nextMonth();
            break;
          case "weeks":
            calendar.nextWeek();
            break;
          case "quarters":
            calendar.nextQuarter();
            break;
          case "years":
            calendar.nextYear();
            break;
        }
      }

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
