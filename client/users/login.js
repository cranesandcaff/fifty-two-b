App.controller('LoginVM', function($reactive, $scope, $state, $mdToast){
  $reactive(this).attach($scope)
  this.user = {}
  this.withPassword = () => {
    Meteor.loginWithPassword(this.user.email, this.user.password, (err, success) => {
      if(err){
        return $mdToast.show($mdToast.simple().position('top right').textContent(err.reason))
      }
      $state.go('app.main')
    })
  }
})
