cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/com.yezhiming.cordova.appinfo/www/appinfo.js",
        "id": "com.yezhiming.cordova.appinfo.AppInfo",
        "merges": [
            "navigator.appInfo"
        ]
    },
    {
        "file": "plugins/org.apache.cordova.statusbar/www/statusbar.js",
        "id": "org.apache.cordova.statusbar.statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "com.yezhiming.cordova.appinfo": "2.0.2",
    "org.apache.cordova.console": "0.2.11",
    "org.apache.cordova.statusbar": "0.1.8"
}
// BOTTOM OF METADATA
});