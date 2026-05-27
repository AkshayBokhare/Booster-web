import { Link } from 'react-router-dom';
import boosterWordmark from '../assets/booster_wordmark.png';

const Navbar = () => {
  return (
    <nav>
      <Link className="nav-logo" to="/">
        <img src={boosterWordmark} alt="Booster" />
      </Link>
      <ul>
        <li><a href="/#how">Intelligence</a></li>
        <li><a href="/#retailers">For Brands</a></li>
        <li><a href="/#dispatch">Request Access</a></li>
        <li><Link to="/track-order" className="nav-cta">Track Order</Link></li>
        <li><a href="" className="nav-cta">Login</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
