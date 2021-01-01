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
      books,
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
  try {
    const {title, author, isbn, opinion} = req.body
    const image = req.files.image

    if(!req.files || image.mimetype.startsWith('image')){
      res.status(400).json({
        success: false,
        error: 'Please upload an image'
      })
    }

    // check file size
    if(file.size > process.env.MAX_FILE_UPLOAD){
      res.status(400).json({
        success: false,
        error: ``
      })
    }

    // raw file from req
    const imgUpload = req.files.img
    const fileNameSplit = imgUpload.name.split('.')
    const fileExtension = fileNameSplit[fileNameSplit.length - 1]

    const validExtensions = ['png', 'jpg', 'gif',]


    const newBook = await Book.create({
      title,
      author,
      isbn,
      opinion,
      image
    })

  } catch (err) {
    res.json({
      success: false,
      error
    })
  }


}