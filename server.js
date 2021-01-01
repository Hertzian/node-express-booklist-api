const path = require('path')
const express = require('express')
// const fileUpload = require('express-fileupload');
const dotenv = require('dotenv')
dotenv.config()
const { connectDb } = require('./config/connectDb')
connectDb()

const app = express()

// to img uploads
// app.use(fileUpload({useTempFiles: true}))

// mount routes
const bookRoutes = require('./routes/bookRoutes')

app.use(express.json())

// use routes
app.use('/api/books', bookRoutes)

// folder to uploaded images
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode, on port ${PORT}`)
)
