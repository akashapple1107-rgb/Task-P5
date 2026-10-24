// This file validates newsletter requests and sends the welcome email.
import 'dotenv/config'
import express from 'express'
import sgMail from '@sendgrid/mail'
import { rateLimit } from 'express-rate-limit'

const router = express.Router()
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Reuse the SendGrid setup from P2. Credentials stay on the server.
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}
sgMail.setTimeout(15000)

const subscribeLimit = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  message: { message: 'Too many subscription attempts. Please try again in 15 minutes.' }
})

router.post('/subscribe', subscribeLimit, async function (req, res) {
  if (!req.is('application/json')) {
    return res.status(415).json({ message: 'Please send the email as JSON.' })
  }

  if (!req.body || typeof req.body.email !== 'string') {
    return res.status(400).json({ message: 'Please enter a valid email address.' })
  }

  const email = req.body.email.trim().toLowerCase()
  if (!emailPattern.test(email) || email.length > 254) {
    return res.status(400).json({ message: 'Please enter a valid email address.' })
  }

  if (!process.env.SENDGRID_API_KEY || !process.env.SENDER_EMAIL) {
    console.error('Newsletter setup missing: check SENDGRID_API_KEY and SENDER_EMAIL in .env.')
    return res.status(503).json({ message: 'Email subscriptions are temporarily unavailable. Please try again later.' })
  }

  const message = {
    to: email,
    from: process.env.SENDER_EMAIL,
    subject: 'Welcome to DEV@Deakin',
    text: 'Welcome to DEV@Deakin! Thank you for subscribing to our daily insider. We are glad to have you in our developer community.'
  }

  try {
    const response = await sgMail.send(message)
    const emailStatus = response[0].statusCode
    console.log('SendGrid response status:', emailStatus)
    console.log('POST /api/subscribe - Status 200 OK')
    return res.status(200).json({
      message: 'Thank you for subscribing! Your welcome email has been accepted for sending. Please check your inbox or spam folder.'
    })
  } catch (error) {
    // Log the status without exposing the key or the provider's response body.
    console.error('SendGrid request failed. Code:', error.code)
    if (error.response) {
      console.error('SendGrid response status:', error.response.statusCode)
    }
    return res.status(502).json({ message: 'We could not send your welcome email. Please try again later.' })
  }
})


export default router
