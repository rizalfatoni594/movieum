import { Link } from 'react-router-dom';
import '../css/NavBar.css';

export default function NavBar() {
  return (
    <div className='navbar'>
      <div className='navbar-brand'>
        <Link to='/'>Movieum 🏛️</Link>
      </div>

      <div className='navbar-links'>
        <div className='nav-link'>
          <Link to='/'>Home</Link>
        </div>
        <div className='nav-link'>
          <Link to='/favorites'>Favorites</Link>
        </div>
      </div>
    </div>
  );
}
