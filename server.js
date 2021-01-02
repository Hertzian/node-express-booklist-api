const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
dotenv.config({ path: 'config.env' })
const { connectDb } = require('./config/connectDb')
connectDb()

const app = express()

// to img uploads
app.use(fileUpload())

// mount routes
const bookRoutes = require('./routes/bookRoutes')

app.use(express.json())

// use routes
app.use('/api/books', bookRoutes)
// app.use('/', (req, res) => res.send('API Running...'))

// folder to uploaded images
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode, on port ${PORT}`)
)
