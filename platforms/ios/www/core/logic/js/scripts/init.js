

//kick off
loadPage('sites', 'startup');


//init phonegap
app.initialize();

//applies some ios7 specific code
$(function () {

    function isPhonegap() {
        return typeof cordova !== 'undefined' || typeof PhoneGap !== 'undefined' || typeof phonegap !== 'undefined';
    }

    function isIOS() {
        return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
    }

    document.addEventListener('deviceready', function () {
        if (isPhonegap() && isIOS() && window.device && parseFloat(window.device.version) >= 7.0) {
            $('#header-wrapper').css('padding', '20px 0 0 0');
            $('#content-container').css('padding', '5.5em 0 10px 0');
        }
    });
});