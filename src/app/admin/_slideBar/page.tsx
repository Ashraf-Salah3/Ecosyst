"use client";
import styles from "./slide-bar.module.scss";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { logo } from "@/assets";

const SidebarPage = () => {
  const router = useRouter();
  const pathName = usePathname();
  const logOutHandler  = ()=>{
    localStorage.removeItem("authToken")
    router.replace("/")
  }

  return (
    <header className={styles["header-container"]}>
      <div className={styles["header"]}>
        <div className={styles.logo}>
          <Image src={logo} alt="" width={500} height={500} />
        </div>
        <nav className={styles.nav}>
          <div className={styles.links}>
            <ul>
              <li
                className={
                  pathName.includes("/admin/lastWorks") ? styles.active : ""
                }
              >
                <Link href="/admin/lastWorks">Last Work</Link>
              </li>
              <li
                className={
                  pathName.includes("/admin/categories") ? styles.active : ""
                }
              >
                <Link href="/admin/categories">Categories</Link>
              </li>
              <li
                className={
                  pathName.includes("/admin/services") ? styles.active : ""
                }
              >
                <Link href="/admin/services">Services</Link>
              </li>
              <li
                className={
                  pathName.includes("/admin/clients") ? styles.active : ""
                }
              >
                <Link href="/admin/clients">Clients</Link>
              </li>
              <li
                className={
                  pathName.includes("/admin/courses") ? styles.active : ""
                }
              >
                <Link href="/admin/courses">Courses</Link>
              </li>
              <li
                className={
                  pathName.includes("/admin/courseMaterial") ? styles.active : ""
                }
              >
                <Link href="/admin/courseMaterial">Course Material</Link>
              </li>
            </ul>
          </div>
          <div className={styles.exit}>
            <button onClick={logOutHandler}>Log Out</button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default SidebarPage;
