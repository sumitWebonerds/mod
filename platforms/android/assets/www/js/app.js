// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var db;
var app =angular.module('starter', ['ionic','starter.controllers', 'ngCordova','ionic-datepicker','starter.services'])

.run(function($ionicPlatform, $rootScope, $state, sessionService, $location,$ionicPopup,$cordovaSQLite,CreateCasenoteService) {
  
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
    document.addEventListener("offline", onOffline, false);        
    document.addEventListener("online", onOnline, false);
         
     
      function onOffline() {
        $state.go('nointernet');
      }

      function onOnline() {
        templateUrl:"template/pdf.html";
      }

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
    if(typeof $cordovaSQLite != undefined){
      db = $cordovaSQLite.openDB({ name: "mod.db" ,location:'default'});
      var table= "casenotes";
      
      //var query ="DROP table casenotes";
     var query = "CREATE TABLE IF NOT EXISTS "+table+" (id integer primary key AUTOINCREMENT, remote_id integer, user_id integer, app_id integer, court_name text, case_number text, first_party_name text, second_party_name text, case_stage text, prev_date text, next_date text, status integer, created_at text, updated_at text, created_by integer, updated_by integer,is_on_remote integer default 0)";;
      //"CREATE TABLE IF NOT EXISTS "+table+" (id integer primary key AUTOINCREMENT, remote_id interger UNIQUE, user_id integer, app_id integer, court_name text, case_number text, first_party_name text, second_party_name text, case_stage text, prev_date text, next_date text, status integer, created_at text, updated_at text, created_by integer, updated_by integer,is_on_remote integer default 0)";
      $cordovaSQLite.execute(db, query, []).then(function(res) {
       console.log("table created"+table);
      }, function (err) {
        console.error(err);
      });
    }            
  });      
})
.constant({
           //API_BASE:"http://192.168.0.104/myoffice/myofficediary/public_html/index.php?r=",
           //IMG_BASE:"http://192.168.0.104/myoffice/myofficediary/public_html/images/",

           API_BASE:"http://192.168.0.54/myoffice/myofficediary/public_html/index.php?r=",
           IMG_BASE:"http://192.168.0.54/myoffice/myofficediary/public_html/images/",
           
           // API_BASE:"http://192.168.43.59/myoffice/myofficediary/public_html/index.php?r=",
           // IMG_BASE:"http://192.168.43.59/myoffice/myofficediary/public_html/images/",

           
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
    cache: false,
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
      cache: false,
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
      cache: false,
      url: '/list',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/list.html'
        }
      }
    })
    .state('app.createnew', {
     cache: false,
      url: '/createnew',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/createnew.html'
        }
      }
    })
    .state('app.detail', {
      cache: false,
      url: '/detail/:id',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/detail.html'
        }
      }
    })
    .state('app.pdf', {
      url: '/pdf',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/pdf.html'
        }
      }
    })
    .state('app.empty', {
      url: '/empty',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/empty.html'
        }
      }
    })
    .state('app.nointernet', {
      url: '/nointernet',
      accessRule: "@",
      views: {
        'menuContent': {
          templateUrl: 'templates/nointernet.html'
        }
      }
    })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/casenotes');
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

