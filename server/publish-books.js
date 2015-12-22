Books.permit(['insert', 'update', 'remove']).ifLoggedIn().apply()
Meteor.publish('books', function(){
  if(!this.userId){
    return this.ready()
  }
  return Books.find({
    createdBy: this.userId
  })
})
