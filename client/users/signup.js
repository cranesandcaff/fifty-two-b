App.controller('SignUpVM', function($reactive, $scope, $state, $mdToast){
  $reactive(this).attach($scope)
  this.user = {}
  this.withPassword = () => {
    Accounts.createUser(this.user, (err, success) => {
      if(err){
        return $mdToast.show($mdToast.simple().position('top right').textContent(err.reason))
      }
      $state.go('app.main')
    })
  }
})
