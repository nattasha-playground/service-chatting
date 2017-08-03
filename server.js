// Get the packages we need
const express = require('express')
const request = require('request')
const dotenv = require('dotenv')
const chat = require('./chat')

// --- Load environment variables
dotenv.load()

// Create our Express application
const app = express()

// Use environment defined port or 3000
const port = process.env.PORT || 3000

// Create our Express router
const router = express.Router()

// --- Root: `http://localhost:3000/api`
router.get('/', (req, res) => {
  res.json({ message: 'Hello!' })
})

var chatRoute = router.route('/chat')

// --- Create endpoint `/api/chat` for GET
chatRoute.get((req, res) => {
  const query = req.query

  if (query.message) {
    const promise = new Promise((resolve, reject) => {
      chat(query.message, resolve)
    }).then( (response) => {
      res.json({ status: 'OK', message: response })
    })
  } else {
    res.json({ status: 'ERROR', message: 'Invalid parameters.' })
  }
})

// Register all our routes with /api
app.use('/api', router)

// Start the server
app.listen(port)
console.log(`Listening to port ${port}`)
