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
    url: '/',
    template: 'Hello World. I am App.'
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
