// Get the packages we need
const express = require('express')
const request = require('request')
const dotenv = require('dotenv')
const chat = require('./chat')

// --- Load environment variables
dotenv.load()

// Create our Express application
const app = express()

// Use environment defined port or 8001
const port = process.env.PORT || 8001

// Create our Express router
const router = express.Router()

// --- Root: `http://localhost:8001/api`
router.get('/', (req, res) => {
  res.json({ message: 'Hello!' })
})

var chatRoute = router.route('/chat')

// --- Create endpoint `/api/chat` for GET
chatRoute.get( async (req, resp) => {
  const query = req.query

  if (query.message) {
    response = await chat(query.message, (response) => {
      resp.json({ status: 'OK', message: response })
    })
  } else {
    resp.json({ status: 'ERROR', message: 'Invalid parameters.' })
  }
})

// Register all our routes with /api
app.use('/api', router)

// Start the server
app.listen(port)
console.log(`Listening to port ${port}`)
