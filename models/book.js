Books = new Meteor.Collection('books')
Books.attachBehaviour('timestampable')
Books.attachSchema({
  title: {
    type: String
  },
  author: {
    type: String,
    optional: true
  },
  pageCount: {
    type: Number,
    defaultValue: 0
  },
  currentPage: {
    type: Number,
    defaultValue: 0
  }
})
