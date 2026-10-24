// Start the backend. Feature code lives in the files imported below.
import 'dotenv/config'
import express from 'express'
import path from 'node:path'
import newsletter from './newsletter.js'

const app = express()
app.disable('x-powered-by')
// Read JSON sent by the React forms.
app.use(express.json({ limit: '10kb' }))
app.use('/api', function (req, res, next) {
  res.set('Cache-Control', 'no-store')
  next()
})
app.use('/api', newsletter)

app.use('/api', function (req, res) {
  res.status(404).json({ message: 'API endpoint not found.' })
})

// Express needs four parameters for an error handler.
app.use(function (error, req, res, next) {
  console.error('Request failed:', error.code || error.name)
  let status = 500
  let message = 'Unable to complete your request. Please try again later.'
  if (error.status === 400 || error.status === 413) {
    status = error.status
    message = 'Invalid request.'
  }
  res.status(status).json({ message: message })
})

// npm start can also serve the website after npm run build.
app.use(express.static('dist'))
app.get('/{*path}', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
})

const port = process.env.PORT || 3001
app.listen(port, '127.0.0.1', function () {
  console.log('DEV@Deakin backend: http://127.0.0.1:' + port)
})
