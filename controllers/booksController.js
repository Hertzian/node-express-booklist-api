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
    res.json({
      success: false,
      error,
    })
  }
}

// @desc    create new book
// @route   POST /api/books
// @access  public
exports.createBook = async (req, res) => {
  console.log(req.files.image)

  try {
    const { title, author, isbn, opinion } = req.body
    const photo = req.files.image

    console.log(photo.mimetype.startsWith('image'))

    // req.files contains a file & make sure photo is an image
    if (!photo.mimetype.startsWith('image')) {
      res.status(400).json({
        success: false,
        error: 'Please upload an image',
      })
    }

    console.log(photo.size)

    // check file size
    if (photo.size > process.env.MAX_FILE_UPLOAD) {
      res.status(400).json({
        success: false,
        error: `Images with less than ${process.env.MAX_FILE_UPLOAD} please`,
      })
    }

    console.log('old image name: ', photo.name)
    // custom name for image uploaded
    photo.name = `photo_${Date.now()}_${path.parse(photo.name).ext}`
    console.log('new image name: ',photo.name)
    console.log('path.parse: ', path.parse(photo.name))

    console.log(process.env.UPLOAD_PATH)

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
    res.json({
      jotio: 'aqui',
      success: false,
      error: err,
    })
  }
}

// @desc    create new book
// @route   DELETE /api/books/:bookId
// @access  public
exports.deleteBook = () => {
  console.log('delete book')
}
