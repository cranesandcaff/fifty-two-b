App.controller('AppVM', function($reactive, $scope, $state){
  $reactive(this).attach($scope)
  this.subscribe('books')
  this.helpers({
    currentUser(){
      return Meteor.user()
    },
    books(){
      return Books.find({
        createdBy: Meteor.userId()
      })
    }
  })
  this.logout = () => {
    Meteor.logout(() => $state.go('app.main'))
  }
})
