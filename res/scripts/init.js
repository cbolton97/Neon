console.log("initializing...");

	var todayDate = "2012-09-02";
	
	
	function loadTimetable(type){
		$('#load').load('res/timetables/list.html #' + type, function() {
		  console.log('Load was performed on ' + type);
		});
	}


console.log("---------------");