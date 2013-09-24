document.addEventListener("resume", deviceResume, false);

loadPanel().done(getDataInit);

function loadTodayTimetable(type, today1, today2, today3, today4){
		$('#timetable-load-today').load('resources/global/assets/timetable-ui.html #' + type, function() {
		  console.log('Load for today was performed on ' + type);
		  $(this).find('#timetable1').html(today1);
		  $(this).find('#timetable2').html(today2);
		  $(this).find('#timetable3').html(today3);
		  $(this).find('#timetable4').html(today4);

		});
	}
function loadtomorrowTimetable(type, tomorrow1, tomorrow2, tomorrow3, tomorrow4){
	$('#timetable-load-tomorrow').load('resources/global/assets/timetable-ui.html #' + type, function() {
	  console.log('Load for tomorrow was performed on ' + type);
	  $(this).find('#timetable1').html(tomorrow1);
	  $(this).find('#timetable2').html(tomorrow2);
	  $(this).find('#timetable3').html(tomorrow3);
	  $(this).find('#timetable4').html(tomorrow4);

	});
}
function getDataInit(){
	getData();
	console.log("updated at " + today);
	setTimeout(function() {
		getDataInit();
		console.log("updated at " + today);
	},5000000);
}
	
function deviceResume(){
	getDataInit();
	setTimeout(function() {
          alert("resumed");
        }, 0);
}
$('.blog-item', '.list-item a').click(function(event){
	var link = $(this).attr('href');
	window.open(link, '_system');
	event.preventDefault();
});

function getData(){

	$.getJSON('resources/global/assets/data.json', function(data) {

		for (var i in data.rotations) {
			if(data.rotations[i].date === today_date){
				var today = data.rotations[i];
				
				switch(today.type){
					case "0":
					case "1":
					case "2":
						var today = data.rotations[i];
			
						var today1 = today.block1;
						var today2 = today.block2;
						var today3 = today.block3;
						var today4 = today.block4;
						
						$('#today-blockday').html("Day " + today.day);
						$('#today-weekday').html(today_weekday);
						$('#today-date').html(today_date);
						$('#block1').html(today1);
						$('#block2').html(today2);
						$('#block3').html(today3);
						$('#block4').html(today4);
						
						loadTodayTimetable(today.type, today1, today2, today3, today4);
					break;
					case "10":
						$('#timetable-today-fail').show();
						$('#timetable-today-fail').html("No School Today");
						$('#today-weekday').html(today_weekday);
						$('#today-date').html(today_date);
						console.log("No School Today");
					break;
				}
				
			}
			if(data.rotations[i].date === tomorrow_date){
				var tomorrow = data.rotations[i];
				
				switch(tomorrow.type){
					case "0":
					case "1":
					case "2":
						var tomorrow = data.rotations[i];
			
						var tomorrow1 = tomorrow.block1;
						var tomorrow2 = tomorrow.block2;
						var tomorrow3 = tomorrow.block3;
						var tomorrow4 = tomorrow.block4;
						
						
						loadtomorrowTimetable(tomorrow.type, tomorrow1, tomorrow2, tomorrow3, tomorrow4);
					break;
					case "10":
						$('#timetable-tomorrow-fail').show();
						$('#timetable-tomorrow-fail').html("No School Tomorrow");
						console.log("No School Tomorrow");
					break;
				}
				
			}
		}

	});

}
	
	