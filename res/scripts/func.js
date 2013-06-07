

$.getJSON('res/db/data.json', function(data) {

	for (var i in data.rotations) {
		if(data.rotations[i].date === todayDate){
			var current = data.rotations[i];
			
			//document.getElementById("date").innerHTML = current.date;
			document.getElementById("today-blockday").innerHTML = "Day " + current.day;
			document.getElementById("block1").innerHTML = current.block1;
			document.getElementById("block2").innerHTML = current.block2;
			document.getElementById("block3").innerHTML = current.block3;
			document.getElementById("block4").innerHTML = current.block4;
			
			switch(current.type){
			
				case "0":
					loadTimetable("0");
				break;
				
				case "1":
					loadTimetable("1");
				break;
			
			}
		}else{}
	}

});