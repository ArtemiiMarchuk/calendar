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
  Date.prototype.daysInMonth = function() {
		return 32 - new Date(this.getFullYear(), this.getMonth(), 32).getDate();
	};
  /*
function chooseDaysPrevious(){
  var today = new Date;
  var days = [];
  for(var i = 1; i <= today.getDate(); i++){
    var
    da.push(days);
  }
}
*/


  $( ".today" ).click(function() {
    pickmeup('.three-calendars').set_date(new Date);
  });
  $( ".yesterday" ).click(function() {
    var yesterday = new Date;
    yesterday.setDate(yesterday.getDate() - 1);
    pickmeup('.three-calendars').set_date(yesterday);
  });
  $( ".weekToDate" ).click(function() {
    var today = new Date;
    var week = [];
    for(var i = 0; i < today.getDay(); i++){
      var days = new Date;
      days.setDate(today.getDate() - today.getDay() + 1 + i);
      week.push(days);
    }
    pickmeup('.three-calendars').set_date(week);
  });
  $( ".monthToDate" ).click(function() {
    var today = new Date;
    var month = [];
    for(var i = 1; i <= today.getDate(); i++){
      var days = new Date;
      days.setDate(i);
      month.push(days);
    }
    pickmeup('.three-calendars').set_date(month);
  });



  $('#previous, .previousValue').on('input', function() {
    var value = $("#previous").val();
    var today = new Date;
    if(value != "default" && $(".previousValue").val().match(/^[-\+]?\d+/) != null){
      switch(value) {
        case "days":
          var today = new Date;
          var selected = [];
          for (var i = 1; i <= $(".previousValue").val(); i++) {
            var day = new Date;
            day.setDate(today.getDate() - i);
            selected.push(day);
          }
          pickmeup('.three-calendars').set_date(selected);
          break;
        case "months":
          var today = new Date;
          var selected = [];
          for (var j = 1; j <= $(".previousValue").val(); j++) {
            var month = new Date;
            month.setMonth(month.getMonth() - j, [1]);
            for (var i = 1; i <= month.daysInMonth(); i++) {
              var day = new Date;
              day.setMonth(day.getMonth() - j, [1]);
              day.setDate(i);
              /*alert(day);*/
              selected.push(day);
            }
          }

          pickmeup('.three-calendars').set_date(selected);
          break;
        case "weeks":
          var today = new Date;
          var selected = [];
          for (var i = 1; i <= 7 * $(".previousValue").val(); i++) {
            var day = new Date;
            day.setDate(today.getDate() - today.getDay() + 1 - i);
            selected.push(day);
          }
          pickmeup('.three-calendars').set_date(selected);
          break;
        case "quarters":
          var today = new Date;
          var selected = [];
          for (var j = 1; j <= 3 * $(".previousValue").val(); j++) {
            var month = new Date;
            month.setMonth(month.getMonth() - j, [1]);

            for (var i = 1; i <= month.daysInMonth(); i++) {
              var day = new Date;
              day.setMonth(day.getMonth() - j, [1]);
              day.setDate(i);
              /*alert(day);*/
              selected.push(day);
            }
          }
          pickmeup('.three-calendars').set_date(selected);
          break;
          /*
        case "years":
          var today = new Date;
          var selected = [];
          for (var k = 1; k <= $(".previousValue").val(); k++) {
            var year = new Date;

            year.setYear(year.getYear() - k);
            alert(year.getYear() - 1);
            for (var i = 0; i <= 11; i++) {
              var month = new Date;
              month.setMonth(month.getMonth() - i, [1]);
              for (var j = 1; j <= 12 * $(".previousValue").val(); j++) {
                var day = new Date;
                day.setYear(year.getYear());
                day.setMonth(month.getMonth() - i, [1]);
                day.setDate(j);
                selected.push(day);
              }
              alert(day);

            }
          }

          pickmeup('.three-calendars').set_date(selected);
          break;*/
      }
    }else{};

  });










});
