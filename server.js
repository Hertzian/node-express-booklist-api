const path = require('path')
const express = require('express')
const fileUpload = require('express-fileupload')
const dotenv = require('dotenv')
const mongoose = require('mongoose')

// env constants
dotenv.config({ path: 'config.env' })

// db connect
const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })

    console.log(`MongoDb connected: ${conn.connection.host}`)
  } catch (err) {
    console.log(`Error: ${err}`)
    process.exit(1)
  }
}
connectDb()

const app = express()

// to img uploads
app.use(fileUpload())

app.use(express.json())

// use routes
app.use('/api/books', require('./routes/bookRoutes'))
// app.use('/', (req, res) => res.send('API Running...'))

// folder public
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(`Server running on ${process.env.NODE_ENV} mode, on port ${PORT}`)
)
