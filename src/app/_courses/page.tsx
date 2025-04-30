"use client";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useFetchCourses } from "../../api/coursesApi";
import styles from "./courses-page.module.scss";
import { useRouter } from "next/navigation";
import Loading from "../loading";
import Image from "next/image";
import { CoursesPageProps } from "@/types/types";
import Head from "next/head";

const CoursesPage = () => {
  const { data: courses, isError, isLoading } = useFetchCourses();
  const router = useRouter();
  if (isError) {
    return <div>Faild Please Try Again</div>;
  }
  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head>
        <title>Courses | Frontend, Backend, UI/UX, Cybersecurity</title>
        <meta
          name="description"
          content="Explore our professional courses in Frontend, Backend, UI/UX Design, and Cybersecurity. Learn from industry experts and boost your skills."
        />
        <meta
          name="keywords"
          content="Frontend courses, Backend courses, UI/UX design training, Cybersecurity courses, web development, programming, IT skills"
        />
        <meta
          property="og:title"
          content="Professional Courses in Frontend, Backend, UI/UX & Cybersecurity"
        />
        <meta
          property="og:description"
          content="Upgrade your skills with our expert-led courses in web development, UI/UX design, and cybersecurity."
        />
        <meta property="og:url" content="https://your-domain.com/courses" />
        <meta property="og:image" content="/images/course-banner.jpg" />
      </Head>

      <div className={styles["course-container"]}>
        <div className="container">
          <h1 className="main-header">Courses</h1>
          <div className={styles["courses-items"]}>
            {courses?.map((course: CoursesPageProps) => (
              <div key={course.id} className={styles["course-content"]}  onClick={() => {
                router.push(`/courseDetails/${course.id}`);
              }}>
                <Image
                  src={course.attachment}
                  alt={course.title}
                  width={300}
                  height={300}
                />
               
                <div className={styles["text"]}>
                  <h3>{course.title.toUpperCase()}</h3>
                  <p>{course.description}</p>
                </div>
                <div className="flex !p-4 !pt-6 justify-between border-b-1 border-white">
                <p className="block bg-[var(--secondary-color)] font-bold rounded-lg !px-2">Duration: {course?.duration} Month</p>
                <p className="block bg-[var(--secondary-color)] font-bold rounded-lg !px-2">Price: {course.price}</p>
                </div>
                <div className={styles["info"]}>
                  <span
                    onClick={() => {
                      router.push(`/courseDetails/${course.id}`);
                    }}
                  >
                    Read More
                  </span>
                  <FaLongArrowAltRight
                    onClick={() => {
                      router.push(`/courseDetails/${course.id}`);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesPage;
