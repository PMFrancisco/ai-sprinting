import './Navbar.css';
import { Link } from 'react-router-dom';
import Button from './Button';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Navbar() {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav>
      <Link to="/">Home</Link>
      {token ? (
        <>
          <Link to="/user-panel">User Panel</Link>
          <Link to="/request-sprint">Request Sprint</Link>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;