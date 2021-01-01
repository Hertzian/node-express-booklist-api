const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'The title is required']
  },
  author: {
    type: String,
    required: [true, 'The author is required']
  },
  isbn: {
    type: String,
    default: '-'
  },
  opinion: {
    type: String,
  },
  image: {
    type: String,
    required: [true, 'An image is required']
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Book', BookSchema)