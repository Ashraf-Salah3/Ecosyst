import styles from "./discover.module.scss";

const Discover = () => {
  return (
    <div className={styles["discover-container"]}>
      <div className="container">
        <div className={styles.items}>
          <div className={styles.title}>
            <h2>Discover ECOSYST</h2>
            <p>Reserve appointment to try ECOSYST</p>
          </div>
          <div className={styles.button}>
            <a
              href="https://api.whatsapp.com/send/?phone=201044847442&text&type=phone_number&app_absent=0&wame_ctl=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;
