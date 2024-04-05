import styles from "./Navigation.module.css";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const getNavLinkClassName = ({ isActive }) => {
  return clsx(styles.link, { [styles.active]: isActive });
};

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink className={getNavLinkClassName} to="/">
        Home
      </NavLink>
      <NavLink className={getNavLinkClassName} to="/movies">
        Movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
