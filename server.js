// Get the packages we need
const express = require('express')

// Create our Express application
const app = express()

// Use environment defined port or 3000
const port = process.env.PORT || 3000

// Create our Express router
const router = express.Router()

// http://localhost:3000/api
router.get('/', (req, res) => {
  res.json({ message: 'Hello, service-chatting here...' })
})

// Register all our routes with /api
app.use('/api', router)

// Start the server
app.listen(port)
console.log('Listening to port ' + port)
