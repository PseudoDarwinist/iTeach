import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-logo">
          <h2>iTeach</h2>
        </div>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link 
              to="/courses" 
              className={`nav-link ${location.pathname === '/courses' ? 'active' : ''}`}
            >
              Courses
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar