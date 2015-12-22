App.controller('BookListVM', function($reactive, $scope, $state){
  $reactive(this).attach($scope)
  this.subscribe('books')
  this.helpers({
    list(){
      return Books.find({
        createdBy: Meteor.userId()
      })
    }
  })
  this.updatePage = (book) => {
    Books.update(book._id, {
      $set: {
        currentPage: book.currentPage
      }
    })
  }
})
