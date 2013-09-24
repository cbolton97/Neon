$('.main-nav').children().click(function(event){
	
	var panel = $(this).attr('id');
	console.log(panel);
	loadPanel(panel);
	
	event.preventDefault();
});


function loadPanel(panel){
	var r = $.Deferred();
	window.scrollTo(0,1);
	switch(panel){
		case "rotation":
			$('#styles-loader').load('resources/panels/rotation/panel.html #styles');
			$('#content-loader').load('resources/panels/rotation/panel.html #content');
			getDataInit();
		break;
		case "blogs":
			$('#styles-loader').load('resources/panels/blogs/panel.html #styles');
			$('#content-loader').load('resources/panels/blogs/panel.html #content');
		break;
		case "profiles":
			$('#styles-loader').load('resources/panels/profiles/panel.html #styles');
			$('#content-loader').load('resources/panels/profiles/panel.html #content');
		break;
		case "about":
			$('#styles-loader').load('resources/panels/about/panel.html #styles');
			$('#content-loader').load('resources/panels/about/panel.html #content');
		break;
	}
	
	setTimeout(function () {
    r.resolve();
  }, 1200);
  
   return r;
	


}
loadPanel('rotation');