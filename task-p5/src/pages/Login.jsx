import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase.js'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  function changeEmail(event) {
    setEmail(event.target.value)
  }

  function changePassword(event) {
    setPassword(event.target.value)
  }

  let successMessage = ''
  if (location.state) {
    successMessage = location.state.message
  }

  let buttonText = 'Login'
  if (busy) {
    buttonText = 'Logging in...'
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password)
      navigate('/', { replace: true })
    } catch {
      setError('Unable to log in. Check your email, password and internet connection.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="auth-area" aria-label="Login">
      <div className="login-card">
        <div className="signup-link"><Link className="outline" to="/signup">Sign up</Link></div>
        <form className="login-form" onSubmit={handleSubmit}>
          {successMessage && <p className="message success" role="status">{successMessage}</p>}
          <label htmlFor="login-email">Your email</label>
          <input id="login-email" type="email" autoComplete="email" maxLength={254} value={email} onChange={changeEmail} required />
          <label htmlFor="login-password">Your password</label>
          <input id="login-password" type="password" autoComplete="current-password" value={password} onChange={changePassword} required />
          {error && <p className="message error" role="alert">{error} <Link to="/signup">Sign up</Link></p>}
          <button className="primary" type="submit" disabled={busy}>{buttonText}</button>
        </form>
      </div>
    </section>
  )
}
