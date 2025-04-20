
import Link from "next/link";
import styles from "./landing.module.scss";

const Landing = () => {
  return (
    <div className={styles["landing-container"]}>
      {" "}
      <h1>IMAGINATION AND INSPIRATION USED TO ACHIEVE PERFECTION</h1>
      <p>
        Carry <span>Bring your business to the next level</span>
      </p>
      <div className={styles.btns}>
        <button className={styles.activebtn}>
          <a  href="https://api.whatsapp.com/send/?phone=201044847442&text&type=phone_number&app_absent=0&wame_ctl=1"
              target="_blank"
              rel="noopener noreferrer">Contact Us</a>
        </button>
        <button>
          <Link href="/aboutUs">About Us</Link>
        </button>
      </div>
      <div className={styles.layout}></div>
    </div>
  );
};

export default Landing;
