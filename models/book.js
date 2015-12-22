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
  currentlyReading: {
    type: Boolean,
    defaultValue: 0
  },
  pageCount: {
    type: Number,
    defaultValue: 0
  },
  currentPage: {
    type: Number,
    defaultValue: 0
  },
  why: {
    type: String,
    optional: true
  },
  review: {
    type: String,
    optional: true
  }
})
