import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import boosterWordmark from '../assets/booster_wordmark.png';
import Login from './Login';
import { clearToken } from '../service/loginService';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loginRole, setLoginRole] = useState(null);
  const [user, setUser] = useState(null);
  const [avatarOpen, setAvatarOpen] = useState(false);

  const loginRef = useRef(null);
  const avatarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (loginRef.current && !loginRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (avatarRef.current && !avatarRef.current.contains(e.target)) {
        setAvatarOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRoleSelect = (role) => {
    setLoginRole(role);
    setDropdownOpen(false);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setLoginRole(null);
  };

  const handleLogout = () => {
    clearToken();
    setUser(null);
    setAvatarOpen(false);
  };

  return (
    <>
      <nav>
        <Link className="nav-logo" to="/">
          <img src={boosterWordmark} alt="Booster" />
        </Link>

        <ul>
          {!user ? (
            <>
              <li><a href="/#how">Intelligence</a></li>
              <li><a href="/#retailers">For Brands</a></li>
              <li><a href="/#dispatch">Request Access</a></li>
              <li><a href="/#contact">Contact Us</a></li>
              <li><Link to="/track-order" className="nav-cta">Track Order</Link></li>

              <li ref={loginRef} className="login-dropdown-wrap">
                <button
                  className="nav-cta login-dropdown-trigger"
                  onClick={() => setDropdownOpen((o) => !o)}
                >
                  Login
                  <svg
                    className={`login-chevron ${dropdownOpen ? 'open' : ''}`}
                    width="10" height="6" viewBox="0 0 10 6"
                    fill="none" xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="login-dropdown-menu">
                    <button className="login-dropdown-item" onClick={() => handleRoleSelect('admin')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.8"/>
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      Admin
                    </button>
                    <button className="login-dropdown-item" onClick={() => handleRoleSelect('dispatcher')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
                        <path d="M8 21h8M12 17v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      Dispatcher
                    </button>
                  </div>
                )}
              </li>
            </>
          ) : (
            <>
              <li className="nav-user-name">{user.name}</li>

              <li ref={avatarRef} className="nav-avatar-wrap">
                <button className="nav-avatar-btn" onClick={() => setAvatarOpen((o) => !o)}>
                  <img
                    className="nav-avatar"
                    src={user.profile_image_url}
                    alt={user.name}
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                  <span className="nav-avatar-fallback" style={{ display: 'none' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </button>

                {avatarOpen && (
                  <div className="nav-avatar-dropdown">
                    <div className="nav-avatar-dropdown-header">
                      <span className="nav-avatar-dropdown-name">{user.name}</span>
                      <span className="nav-avatar-dropdown-role">{user.role}</span>
                    </div>
                    <div className="nav-avatar-dropdown-divider" />
                    <button className="nav-avatar-dropdown-item logout" onClick={handleLogout}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <polyline points="16 17 21 12 16 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>
      </nav>

      {loginRole && (
        <Login
          role={loginRole}
          onLogin={handleLogin}
          onClose={() => setLoginRole(null)}
        />
      )}
    </>
  );
};

export default Navbar;
