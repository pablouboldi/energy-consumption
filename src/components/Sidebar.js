import styles from './Sidebar.module.css'
import AppNav from "./AppNav";
import Logo from "./Logo";

function Sidebar({handleFileUpload}) {
  return (
    <div className={styles.sidebar}>
      <Logo/>
      <AppNav handleFileUpload={handleFileUpload}/>

      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy; Copyright {new Date().getFullYear()} by Athena Inc.
        </p>
      </footer>
    </div>
  )
}

export default Sidebar;