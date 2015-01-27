 function onDeviceReady(){

  document.write("<h1>Hi there</h1>");
  navigator.appInfo.getAppInfo(function(appInfo) {
    document.write('Running the cool ' + appInfo.version);
  }, function(err){
      document.write(err);
  });
}