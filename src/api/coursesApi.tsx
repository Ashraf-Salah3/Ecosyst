import { useQuery } from "@tanstack/react-query"
import axios from "axios"


const fetchCourses = async () => {
    const response = await axios.get("https://spidcourse.runasp.net/api/Courses")
    return response.data.data
}

const fetchCourseById = async (courseId : number) => {
    const response = await axios.get(`https://spidcourse.runasp.net/api/Courses/${courseId}`)
    return response.data.data
}

export const useFetchCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: fetchCourses,
    })
}

export const useFetchCourseById = (courseId:number) => {
    return useQuery({
        queryKey: ["course", courseId],
        queryFn: () => fetchCourseById(courseId),
        enabled: !!courseId, // prevents query from running if courseId is falsy
    })
}
