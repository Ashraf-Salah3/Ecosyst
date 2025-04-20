import styles from "./footer.module.scss";
import { FaFacebook, FaInstagram, FaLinkedinIn, FaSnapchat} from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa6";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className="container">
        <footer>
          <div className={styles.icons}>
            <a
              href="https://www.facebook.com/share/1BFwYVy59Q/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={21} color="#fff" />
            </a>
      
            <a
              href="https://api.whatsapp.com/send/?phone=201044847442&text&type=phone_number&app_absent=0&wame_ctl=1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp size={21} color="#fff" />
            </a>
            <a
              href="https://www.instagram.com/eco.syst/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={21} color="#fff" />
            </a>
            <a
              href="https://snapchat.com/t/XyhxUWLj"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSnapchat size={21} color="#fff" />
            </a>
            <a
              href="https://www.linkedin.com/company/ecosyst220/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn size={21} color="#fff" />
            </a>
          </div>
        </footer>
        <div className={styles["copy-right"]}>
          <p>© 2024 – 2025 Anron. Built with ECOSYST. All rights reserved. </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
