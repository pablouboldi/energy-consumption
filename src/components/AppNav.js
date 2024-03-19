import styles from './AppNav.module.css'
import {NavLink} from "react-router-dom";
import FileImport from "./FileImport";


function AppNav({handleFileUpload}) {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to='dashboard'>Dashboard</NavLink>
        </li>
        <li>
          <FileImport handleFileUpload={handleFileUpload}/>
        </li>
      </ul>
    </nav>
  )
}

export default AppNav;