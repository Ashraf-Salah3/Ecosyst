"use client";
import { useFetchCourseById } from "@/api/coursesApi"
import Loading from "@/app/loading"

import { useParams } from "next/navigation";
import CoursesForm from "../../_coursesForm/CoursesForm"


const EditCourse = () => {
    const {id} = useParams()
    const pathId = id ? id as string : ""

    const {data:courses , isError , isLoading} = useFetchCourseById(Number(pathId))
    if(isLoading) return <Loading/>
    if(isError) return <h1>Course not found</h1>
  return (
    <CoursesForm isEdit initialData={courses} courseId={Number(pathId)}/>
  )
}
export default EditCourse