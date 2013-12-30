
//ios7 status bar fix
function onDeviceReady() {
    if (parseFloat(window.device.version) === 7.0) {
        $('#wrapper-header').css('padding-top', '20px');
        $('#content-container').css('padding-top', '3em');
    }
}

document.addEventListener('deviceready', onDeviceReady, false);

//global used to determine user input type ie touchstart
var trigger = "click";


//phonegap watching for app resume
document.addEventListener("resume", onResume, false);
function onResume() {
    setTimeout(function () {
        var page = $('.header-refresh').attr('href');
        loadPage(page, "resume");
    }, 0);
}


//creates time, space, and quite possibly the universe.

window.today;
window.tomorrow;
function createDate() {
    var days = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
    var months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December');

    var today = new Date();
    var todayDate = ((today.getDate() < 10) ? "0" : "") + today.getDate();
    function fourdigits(number) {
        return (number < 1000) ? number + 1900 : number;
    }

    var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
    var tomorrowDate = ((tomorrow.getDate() < 10) ? "0" : "") + tomorrow.getDate();
    function fourdigits(number) {
        return (number < 1000) ? number + 1900 : number;
    }

    var today_weekday = days[today.getDay()];

    window.today = months[today.getMonth()] + " " + todayDate + ", " + (fourdigits(today.getYear()));
    window.tomorrow = months[tomorrow.getMonth()] + " " + tomorrowDate + ", " + (fourdigits(tomorrow.getYear()));
}

//error handling
function error(location, message) {
    switch(location){
        case "today":
            $('#timetable-today-loader').load('./core/styling/templates/timetable-ui.html #error-today', function () {

                $('.error-message-today').html(message);
                $('.error-message-today').append("<span>Please refer to the school's website for the most up to date information.</span>");
            });
            break;
        case "tomorrow":
            $('#timetable-tomorrow-loader').load('./core/styling/templates/timetable-ui.html #error-tomorrow', function () {

                $('.error-message-tomorrow').html(message);
                $('.error-message-tomorrow').append("<span>Please refer to the school's website for the most up to date information.</span>");
            });
            break;
    }
    
}
//animation plugin for refresh button
$.fn.animateRotate = function (angle, duration, easing, complete) {
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function (i, e) {
        args.step = function (now) {
            $.style(e, '-webkit-transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
        };

        $({ deg: 0 }).animate({ deg: angle }, args);
    });
};
//watches refresh button

$('.header-refresh').bind(trigger, function (event) {
    var refreshTarget = $(this).attr('href');
    loadPage(refreshTarget, "refresh button");
    $('.header-refresh').animateRotate(360, 1000, "linear");
    event.preventDefault();
});
//watches list-drop down
$('.staff-list ul').on(trigger, 'li', function (event) {
    var childPanel = $(this).find('.item-link-container');
    var panelTest = $(childPanel).is(":visible");

    if (panelTest) {
        $(this).find('.item-link-container').hide();
        $('.item-link-container').hide();
    } else {
        $('.item-link-container').hide();
        $(this).find('.item-link-container').show();
    }
});

//watches lists for web links and parses them with phonegap code
$('.web-data').on(trigger, '.item-web', function (event) {
    var link = $(this).attr('href');
    var ref = window.open(link, '_system', 'location=yes');
    //insert InAppBrowser code for phonegap.
    event.preventDefault();
    event.returnValue = false;
});

