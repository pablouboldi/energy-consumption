import styles from "./Homepage.module.css";
import {Link} from "react-router-dom";
import PageNav from "../components/PageNav";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav/>

      <section>
        <h1>
          Live peacefully.
          <br/>
          ENERGER tracks your home energy for you.
        </h1>
        <h2>
          A tool that let's you track your energy consumption and compare it
          with your city temperature to check that you are not spending money
          where you don't need to.
        </h2>

        <Link to='app' className='cta'>Go to your Dashboard</Link>
      </section>
    </main>
  );
}
