import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <Link className="brand" to="/">DEV@Deakin</Link>
      <div className="search-box">
        <span aria-hidden="true" className="search-icon" />
        <input aria-label="Search (available in a future task)" placeholder="Search..." disabled />
      </div>
      <Link className="nav-post" to="/post">Post</Link>
      <Link className="nav-login" to="/login">Login</Link>
    </header>
  )
}
