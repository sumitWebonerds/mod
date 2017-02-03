// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app =angular.module('starter', ['ionic', 'starter.controllers',"ion-datetime-picker"])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.constant({
           API_BASE:"http://localhost/myoffice/myofficediary/public_html/index.php?r=",
           IMG_BASE:"http://localhost/myoffice/myofficediary/public_html/images/",

        //API_BASE: "http://www.smartnarayangaon.com/index.php?r=",
        //IMG_BASE: "http://www.smartnarayangaon.com/images/",
    })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.casenotes', {
    url: '/casenotes',
    views: {
      'menuContent': {
        templateUrl: 'templates/casenotes.html'
      }
    }
  })

  .state('app.mysearch', {
      url: '/mysearch',
      views: {
        'menuContent': {
          templateUrl: 'templates/mysearch.html'
        }
      }
    })
    .state('app.edit', {
      url: '/edit',
      views: {
        'menuContent': {
          templateUrl: 'templates/edit.html'
        }
      }
    })
    .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      }
    })
    .state('app.forgot', {
      url: '/forgot',
      views: {
        'menuContent': {
          templateUrl: 'templates/forgot.html'
        }
      }
    })
    .state('app.reset', {
      url: '/reset',
      views: {
        'menuContent': {
          templateUrl: 'templates/reset.html'
        }
      }
    })
    .state('app.list', {
      url: '/list',
      views: {
        'menuContent': {
          templateUrl: 'templates/list.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/signup');
});
