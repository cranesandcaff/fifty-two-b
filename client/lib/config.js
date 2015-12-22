App = angular.module('fiftyTwoB', [
  'angular-meteor',
  'ngMaterial',
  'ngAnimate',
  'ngAria',
  'ui.router'
])

App.config(function($stateProvider, $urlRouterProvider, $locationProvider){
  $locationProvider.html5Mode(true)
  $urlRouterProvider.otherwise('/')
  $stateProvider.state('app', {
    templateUrl: 'client/app.html',
    controller: 'AppVM as App'
  })
  .state('app.main', {
    url: '/',
    template: 'Main App Page'
  })
  .state('app.login', {
    url: '/login',
    templateUrl: 'client/users/login.html',
    controller: 'LoginVM as Login'
  })
  .state('app.signUp', {
    url: '/sign-up',
    templateUrl: 'client/users/signup.html',
    controller: 'SignUpVM as SignUp'
  })
})

function onReady(){
  angular.bootstrap(document, ['fiftyTwoB'])
}

if(Meteor.isCordova){
  angular.element(document).on('deviceready', onReady)
} else {
  angular.element(document).ready(onReady)
}
