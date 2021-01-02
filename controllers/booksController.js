const path = require('path')
const Book = require('../models/BookModel')

// @desc    get all books
// @route   GET /api/books
// @access  public
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find()

    if (!books) {
      res.json({
        success: true,
        message: 'No books found',
      })
    }

    res.json({
      success: true,
      data: books,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error,
    })
  }
}

// @desc    create new book
// @route   POST /api/books
// @access  public
exports.createBook = async (req, res) => {
  // this because doesnt catch the error...
  if(req.files === null){
    res.status(400).json({
      success: false,
      error: 'Please upload an image',
    })
  }

  try {
    const { title, author, isbn, opinion } = req.body
    const photo = req.files.image

    // req.files contains a file & make sure photo is an image
    if (!photo.mimetype.startsWith('image')) {
      res.status(400).json({
        success: false,
        error: 'Please upload an image',
      })
    }

    // check file size
    if (photo.size > process.env.MAX_FILE_UPLOAD) {
      res.status(400).json({
        success: false,
        error: `Images with less than ${process.env.MAX_FILE_UPLOAD} please`,
      })
    }

    // custom name for image uploaded
    photo.name = `photo_${Date.now()}_${path.parse(photo.name).ext}`

    photo.mv(`${process.env.UPLOAD_PATH}/${photo.name}`, async (err) => {
      if (err) {
        console.log(err)
        res.status(400).json({
          success: false,
          error: 'Problen with upload',
        })
      }

      const newBook = await Book.create({
        title,
        author,
        isbn,
        opinion,
        image: photo.name,
      })

      newBook.save()

      res.json({
        success: true,
        data: newBook,
      })
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    })
  }
}

// @desc    create new book
// @route   DELETE /api/books/:bookId
// @access  public
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)

    if (!book) {
      res.status(404).json({
        success: false,
        error: 'No book found',
      })
    }

    book.remove()

    res.json({
      success: true,
      data: {},
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err,
    })
  }
}
