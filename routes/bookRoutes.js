const path = require('path')
const fs = require('fs')
const express = require('express')
const Book = require('../models/BookModel')

const router = express.Router()

// @desc    get all books
// @route   GET /api/books
// @access  public
router.get('/', async (req, res) => {
  try {
    const books = await Book.find()

    if (!books) {
      return res.json({
        success: false,
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
})

// @desc    create new book
// @route   POST /api/books
// @access  public
router.post('/', async (req, res) => {
  // this because doesnt catch the error...
  if (req.files === null) {
    return res.status(400).json({
      success: false,
      error: 'Please upload an image',
    })
  }

  try {
    const { title, author, isbn, opinion } = req.body
    const photo = req.files.image

    // req.files contains a file & make sure photo is an image
    if (!photo.mimetype.startsWith('image')) {
      return res.status(400).json({
        success: false,
        error: 'Please upload an image',
      })
    }

    // check file size
    if (photo.size > process.env.MAX_FILE_UPLOAD) {
      return res.status(400).json({
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
})

// @desc    create new book
// @route   DELETE /api/books/:bookId
// @access  public
router.delete('/:bookId', async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId)

    if (!book) {
      res.status(404).json({
        success: false,
        error: 'No book found',
      })
    }

    fs.unlinkSync(`${process.env.UPLOAD_PATH}/${book.image}`)

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
})

module.exports = router
