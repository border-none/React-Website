import { Link, NavLink, useMatch, useResolvedPath } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <nav className="nav">
      <Link to="/" id="title" className="site-title">
        POKEMONZA
      </Link>
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
  const resolvedPath = useResolvedPath(link);
  const isActive = useMatch({ path: resolvedPath.pathname });

  return (
    <li className={isActive.pathname ? '' : ''}>
      <Link to={link} {...props}>
        {children}
      </Link>
    </li>
  );
}
