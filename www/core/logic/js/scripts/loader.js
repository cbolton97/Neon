
//watches nav for user input
$('#wrapper-nav ul a').bind(trigger, function (event) {

	var requestedPage = $(this).attr('href');
	loadPage(requestedPage, 'nav');
	event.returnValue = false;
	event.preventDefault();
	navigator.notification.vibrate(10);
});


//main loader func, aka the router
function loadPage(requestedPage, source){
	$('.content-element').hide();
	$('title').html(requestedPage);
	$('.'+ requestedPage).removeAttr('style');
	$('.header-refresh').attr('href', requestedPage);
	routePage(requestedPage);
}



	

