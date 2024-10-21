import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <header className="app-header">
      <div className="header-content">
        {/* Logo */}
        <NavLink to="/" className="logo">
          <img src="/images/logo.png" alt="App Logo" />
        </NavLink>

        {/* Navigation Links */}
        <nav className="nav-links">
          {/* Show "Create a New Spot" button only if user is logged in */}
          {sessionUser && (
            <NavLink to="/spots/new" className="create-spot-button">
              Create a New Spot
            </NavLink>
          )}
        </nav>

        {/* Auth/User Buttons */}
        <nav className="auth-buttons">
          {isLoaded && <ProfileButton user={sessionUser} />}
        </nav>
      </div>
    </header>
  );
}

export default Navigation;
