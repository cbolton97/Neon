console.log("initializing...");
	
	var now = new Date();

	var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
	var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');

	var date = ((now.getDate()<10) ? "0" : "")+ now.getDate();

	function fourdigits(number)	{
		return (number < 1000) ? number + 1900 : number;
	}

	today_weekday =  days[now.getDay()];
	today_date = months[now.getMonth()] + " " + date + ", " + (fourdigits(now.getYear())) ;

	document.getElementById('today-weekday').innerHTML = today_weekday;
	document.getElementById('today-date').innerHTML = today_date;
	
//====================================================================

	var todayDate = "2012-09-01";
	
	
	function loadTimetable(type){
		$('#load').load('res/timetables/list.html #' + type, function() {
		  console.log('Load was performed on ' + type);
		});
	}


console.log("---------------");