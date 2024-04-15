import { Link, useLocation } from "react-router-dom";
import styles from './MenuLinks.module.css';

const MenuLinks = ({ to, children }) => {
  const location = useLocation();

  return (
    <Link
      className={`
        ${styles.link}
        ${location.pathname === to ? styles.linkContrast : ""}
      `} to={to}>
        {children}
      </Link>
  )
}

export default MenuLinks;