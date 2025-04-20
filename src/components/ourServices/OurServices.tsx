
"use client"
import { CiMobile3 } from "react-icons/ci";
import styles from "./our-services.module.scss";
import { TbDeviceDesktopCode } from "react-icons/tb";
import { Browsers } from "phosphor-react";

const OurServices = () => {
  return (
    <div className={styles["our-services"]}>
      <h1 className="main-header">Our Services</h1>
      <div className="container">
        <div className={styles["services-items"]}>
          <div className={styles.box}>
            <CiMobile3 size={25}/>
            <h3>Mobile Application</h3>
            <p>
              We create targeted strategies so your video content speaks to the
              right audience in the right way
            </p>
          </div>
          <div className={styles.box}>
            <Browsers size={25}/>
            <h3>Web</h3>
            <p>We design brochures, catalogs and other marketing collateral</p>
          </div>
          <div className={styles.box}>
            <TbDeviceDesktopCode size={25}/>
            <h3>Desktop</h3>
            <p>
              Our talented and experienced team of designers, developers and
              business Whatever you require, can develop it
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
