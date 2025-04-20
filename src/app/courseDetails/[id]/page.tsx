"use client";
import { useParams } from "next/navigation";
import styles from "../course-details.module.scss";
import { useFetchCourseById } from "@/api/coursesApi";
import Loading from "@/app/loading";
import Image from "next/image";
import { useFetchMaterialById } from "@/api/materialApi";
import { MaterialType } from "@/types/types";

const CourseDetails = () => {
  const { id } = useParams();
  const courseId = id ? (id as string) : "";
  const { data: course, isLoading } = useFetchCourseById(Number(courseId));
  const { data: material } = useFetchMaterialById(courseId);

  if (isLoading) return <Loading />;
  return (
    <div className="container">
      <div className={styles["course-container"]}>
        <div className={styles["course-title"]}>
          <h1>{course?.title} course content</h1>
          <p>{course?.description} </p>
        </div>
        <div className={styles.image}>
          <Image
            src={course?.attachment}
            alt={course?.title}
            width={500}
            height={500}
            priority
          />
        </div>
        <div className={styles.material}>
          <h3>Contant</h3>
          <ul>
            {material?.map((material: MaterialType) => (

              <li key={material.id}>{material?.title.toUpperCase()}
                 <p>{material.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.btn}>
          <a
            href="https://api.whatsapp.com/send/?phone=201044847442&text&type=phone_number&app_absent=0&wame_ctl=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
