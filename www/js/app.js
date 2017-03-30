// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'LocalStorageModule'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    var permissions = cordova.plugins.permissions;
    permissions.hasPermission(permissions.CAMERA, checkPermissionCallback, null);
    //permissions.hasPermission(permissions.RECORD_AUDIO, checkPermissionCallback, null);
     
    function checkPermissionCallback(status) {
      if(!status.hasPermission) {
        var errorCallback = function() {
          console.log('Please allow permissions to Camera to Enable Video Calling Feature.');
        }
     
        permissions.requestPermissions(
          [permissions.CAMERA, permissions.MODIFY_AUDIO_SETTINGS, permissions.RECORD_AUDIO, permissions.READ_EXTERNAL_STORAGE],
          function(status) {
            if(!status.hasPermission) errorCallback();
          },
          errorCallback);
      }
    }

    /*if(window.cordova){
      var permissions = cordova.plugins.permissions;
      permissions.hasPermission(permissions.CAMERA, checkPermissionCallback, null);

      function checkPermissionCallback(status) {
        if(!status.hasPermission) {
          var errorCallback = function() {
            console.warn('Camera permission is not turned on');
          }

          permissions.requestPermissions(
            [permissions.CAMERA, permissions.RECORD_AUDIO],
            function(status) {
              if(!status.hasPermission) errorCallback();
            },
            errorCallback);
        }
      }
    }*/
  });
})
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/index.html'
    })

    .state('app', {
      url: '/app',
      templateUrl: 'templates/videocall.html'
    });

    $urlRouterProvider.otherwise('/login'); //set default page
});
