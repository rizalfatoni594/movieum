import '../css/Navbar.css';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <Link to='/'>MovieJar</Link>
      </div>

      <div className='navbar-links'>
        <Link to='/' className='nav-link'>
          Home
        </Link>
        <Link to='/favorites' className='nav-link'>
          Favorites
        </Link>
      </div>
    </nav>
  );
}
