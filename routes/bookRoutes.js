const express = require('express')
const booksController = require('../controllers/booksController')
const router = express.Router()

router.get('/', booksController.getBooks)

module.exports = router