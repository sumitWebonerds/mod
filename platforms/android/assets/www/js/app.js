// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app =angular.module('starter', ['ionic','starter.controllers', 'ngCordova','ionic-datepicker'])

.run(function($ionicPlatform, $rootScope, $state, sessionService, $location,$ionicPopup) {
  $rootScope.$on('$stateChangeStart',
            function(event, toState, toParams, fromState, fromParams) {
                //do something
                if (toState.accessRule == "@") {
                    var currentUser = {};

                     currentUser = sessionService.get("moduser");
                    //console.log("currentUser", currentUser);
                    if (typeof currentUser == 'undefined' || currentUser == null) {
                        //console.log("currentUser", currentUser);
                        $location.path("app/login")
                        $state.go('app.login');
                    }
                }     
            })


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

        // API_BASE: "http://www.myofficediary.org/index.php?r=",
        // IMG_BASE: "http://www.myofficediary.org/images/",
    })

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    cache: false,
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.casenotes', {
    url: '/casenotes',
    accessRule: "@",
    views: {
      'menuContent': {
        templateUrl: 'templates/casenotes.html'
      }
    }
  })

  .state('app.mysearch', {
      url: '/mysearch',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/mysearch.html'
        }
      }
    })
    .state('app.edit', {
      url: '/edit/:id',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/edit.html'
        }
      }
    })
    .state('app.signup', {
      url: '/signup',
      accessRule: "*",
      views: {
        'menuContent': {
          templateUrl: 'templates/signup.html'
        }
      }
    })
    .state('app.login', {
      url: '/login',
      accessRule: "*",
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html'
        }
      }
    })
    .state('app.forgot', {
      url: '/forgot',
      accessRule: "*",
      views: {
        'menuContent': {
          templateUrl: 'templates/forgot.html'
        }
      }
    })
    .state('app.reset', {
      url: '/reset',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/reset.html'
        }
      }
    })
    .state('app.list', {
      url: '/list',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/list.html'
        }
      }
    })
    .state('app.createnew', {
      url: '/createnew',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/createnew.html'
        }
      }
    })
    .state('app.detail', {
      url: '/detail/:id',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/detail.html'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/list');
});

app.factory('sessionService', ['$http', function($http) {
    return {
        set: function(key, value) {
            return localStorage.setItem(key, JSON.stringify(value));
        },
        get: function(key) {
            return JSON.parse(localStorage.getItem(key));
        },
        destroy: function(key) {
            return localStorage.removeItem(key);
        },
    };
}]);