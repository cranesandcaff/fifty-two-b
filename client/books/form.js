App.controller('BookCreateVM', function($reactive, $scope, $state, $mdToast){
  $reactive(this).attach($scope)
  this.model = {}
  this.save  = () => {
    Books.insert(this.model, (err, success) => {
      if(err){
        return $mdToast.show($mdToast.simple().position('top right').textContent(err.message))
      }
      $state.go('app.main')
    })
  }
})
