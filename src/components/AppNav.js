import styles from "./AppNav.module.css";
import {NavLink} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBullseye, faChartLine, faMoneyBillWave} from "@fortawesome/free-solid-svg-icons";

function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="dashboard">
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faChartLine} size="lg"/>
            </span>
            <span>
              Dashboard
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/pricing">
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faMoneyBillWave} size="lg"/>
            </span>
            <span>
              Pricing
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/product">
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faBullseye} size="lg"/>
            </span>
            <span>
              Product
            </span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;