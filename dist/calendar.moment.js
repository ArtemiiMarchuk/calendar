
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
      this.end = moment();
      this.start = moment();
    }

    previousDay(){
      this.start.subtract(this.number, 'days');
      this.end.subtract(1, 'days');
    }

    previousMonth(){
      this.start.subtract(this.number, 'months').startOf('month');
      this.end.subtract(1, 'months').endOf('month');
    }

    previousWeek(){
      this.start.subtract(this.number, 'weeks').startOf('isoWeek');
      this.end.startOf('week');
    }

    previousQuarter(){
      this.start.subtract(this.number, 'quarters').startOf('quarter');
      this.end.startOf('quarter').subtract(1, 'days');
    }

    previousYear(){
      this.start.subtract(this.number, 'years').startOf('year');
      this.end.startOf('year').subtract(1, 'days');
    }

    nextDay(){
      this.end.add(this.number, 'days');
      this.start.add(1, 'days');
    }

    nextMonth(){
      this.end.add(this.number, 'months').endOf('month');
      this.start.add(1, 'months').startOf('months');
    }

    nextWeek(){
      this.end.add(this.number, 'weeks').endOf('isoWeek');
      this.start.add(1, 'weeks').startOf('isoWeek');
    }

    nextQuarter(){
      this.end.add(this.number, 'quarters').endOf('quarter');
      this.start.add(1, 'quarters').startOf('quarter');
    }

    nextYear(){
      this.end.add(this.number, 'years').endOf('year');
      this.start.add(1, 'years').startOf('year');
    }

    setCalendar() {
      pickmeup(this.calendar).set_date([this.start.format(), this.end.format()]);
    }

    static today(calendarName){
      pickmeup(calendarName).set_date(moment().format());
    }

    static yesterday(calendarName){
      pickmeup(calendarName).set_date(moment().subtract(1, 'days').format());
    }

    static weekToDate(calendarName){
      let now = new Date;
      pickmeup(calendarName).set_date([moment().startOf('isoWeek').format(), new Date]);
    }

    static monthToDate(calendarName){
      pickmeup(calendarName).set_date([moment().startOf('month').format(), new Date]);
    }

    static quarterToDate(calendarName){
      let now = new Date;
      pickmeup(calendarName).set_date([moment().startOf('quarter').format(), new Date]);
    }

    static yearToDate(calendarName){
      pickmeup(calendarName).set_date([moment().startOf('year').format(), new Date]);
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

        calendar.setCalendar();
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

        calendar.setCalendar();
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





















/**/
