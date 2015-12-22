App.controller('AppVM', function($reactive, $scope, $state){
  $reactive(this).attach($scope)
  this.helpers({
    currentUser(){
      return Meteor.user()
    }
  })
  this.logout = () => {
    Meteor.logout(() => $state.go('app.main'))
  }
})
