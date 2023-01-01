import { Link, NavLink, useMatch, useResolvedPath } from 'react-router-dom';
import Search from './Search';

export default function Navbar(props) {
  return (
    <nav className="nav">
      <Link to="/" id="title" className="site-title">
        POKEMONINA
      </Link>
      <Search placeholder="search pokemon..." />
      <ul>
        <CustomLink to="/signin">
          <p>{props.main}</p>
        </CustomLink>
        <CustomLink to="/signup">
          <p>{props.secondary}</p>
        </CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ link, children, ...props }) {
  return (
    <li>
      <Link to={link} {...props}>
        {children}
      </Link>
    </li>
  );
}
