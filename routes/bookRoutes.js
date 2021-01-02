const express = require('express')
const booksController = require('../controllers/booksController')
const router = express.Router()

router.get('/', booksController.getBooks)
router.post('/', booksController.createBook)
router.delete('/:bookId', booksController.deleteBook)

module.exports = router