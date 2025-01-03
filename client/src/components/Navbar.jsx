import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/user-panel">User Panel</Link>
      <Link to="/request-sprint">Request Sprint</Link>
    </nav>
  );
}

export default Navbar;