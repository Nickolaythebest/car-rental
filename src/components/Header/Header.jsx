
import css from './Header.module.css';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const buildLinkClass = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };
const Header = () => {
    return (
        <div>
        <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
        Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
        Movie
        </NavLink>
        </nav>
        </div>
    );
};
export default Header;