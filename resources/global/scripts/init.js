console.log("initializing...");

var days = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
var months = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
	
var today = new Date();

var todayDate = ((today.getDate()<10) ? "0" : "")+ today.getDate();
function fourdigits(number)	{
	return (number < 1000) ? number + 1900 : number;
}

var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)

var tomorrowDate = ((tomorrow.getDate()<10) ? "0" : "")+ tomorrow.getDate();
function fourdigits(number)	{
	return (number < 1000) ? number + 1900 : number;
}

var today_weekday = days[today.getDay()];

var today_date = months[today.getMonth()] + " " + todayDate + ", " + (fourdigits(today.getYear())) ;
var tomorrow_date = months[tomorrow.getMonth()] + " " + tomorrowDate + ", " + (fourdigits(tomorrow.getYear()));

console.log(today_date);
console.log(tomorrow_date);
	
//====================================================================



console.log("---------------");