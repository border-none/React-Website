import { Link, NavLink, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        POKEMONZA
      </Link>
      <ul>
        <CustomLink to="/signin">SIGN IN</CustomLink>
        <CustomLink to="/signup">SIGN UP</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ link, children, ...props }) {
  const resolvedPath = useResolvedPath(link);
  const isActive = useMatch({ path: resolvedPath.pathname });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={link} {...props}>
        {children}
      </Link>
    </li>
  );
}
