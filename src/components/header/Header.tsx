"use client"
import styles from "./header.module.scss";
import {  useState } from "react";
import { logo } from "../../assets";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const pathName = usePathname()


  const toggleMenu = () => setShowMenu((prev) => !prev);

  return (
    <div className={styles.header}>
      <div className={styles["mobile-menu"]}>
        <div className={styles.logo}>
          <Image src={logo} alt="Logo" width={200} height={200}/>
        </div>
        <div className={styles["menu-icon"]}>
          {showMenu ? (
            <IoMdClose size={28} onClick={toggleMenu} color="white" />
          ) : (
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} color="white" />
          )}
        </div>
      </div>
      <nav
        className={showMenu ? styles["show-nav"] : styles["hide-nav"]}
      >
        <ul onClick={()=>setShowMenu(false)}>
          <li className={pathName === "/"  ? styles.activeLink : ""}>
            <Link href="/" >
              <span>Home</span>
            </Link>
          </li>
          <li className={pathName === "/last-works"  ? styles.activeLink : ""}>
            <Link href="/last-works">
              <span>Works</span>
            </Link>
          </li>
          <li className={pathName === "/aboutUs"  ? styles.activeLink : ""}>
            <Link href="/aboutUs">
              <span>About Us</span>
            </Link>
          </li>
          {/* <li className={pathName === "/courses"  ? styles.activeLink : ""}>
            <Link href="/courses">
              <span>Courses</span>
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
