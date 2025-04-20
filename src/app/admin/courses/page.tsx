
"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFetchCourses } from "@/api/coursesApi";
import instance from "@/axios";
import Loading from "@/app/loading";
import { CoursesPageProps } from "@/types/types";

;
const Courses = () => {
  const router = useRouter()
  const { data: courses, isLoading ,isError } = useFetchCourses();

  const handleDelete = async (id:number) => {
    try {
      await instance.delete(`Project/${id}`);
      toast.success("Project deleted successfully ");
    } catch {
      toast.error("failed to delete project");
    }
  };
  if (isLoading) {
    return <Loading />;
  }
  if (isError) {
    return <p>Error fetching courses</p>;
  }
  return (
    <div className="container">
      <div className="main-title">
        <h1>Courses</h1>
        <button onClick={() => router.push("/admin/courses/addCourse")}>
          <FaPlus />
          Add New
        </button>
      </div>
      <TableContainer component={Paper} className="tableContainer">
        <Table className="table table-striped table-hover">
          <TableHead className="subhead">
            <TableRow>
              <TableCell>
                <div>Id</div>
              </TableCell>
              <TableCell>
                <div>Course Name</div>
              </TableCell>
              <TableCell>
                <div>Description</div>
              </TableCell>
              <TableCell>
                <div>Price</div>
              </TableCell>
              <TableCell>
                <div>Duration</div>
              </TableCell>
              <TableCell>
                <div>Action</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course:CoursesPageProps, index:number) => (
              <TableRow key={index} className="subContent">
                <TableCell>
                  <p>{course.id}</p>
                </TableCell>
                <TableCell>
                  <p>{course.title}</p>
                </TableCell>
                <TableCell>
                  <p>{course.description}</p>
                </TableCell>
                <TableCell>
                  <p>{course.price}</p>
                </TableCell>
                <TableCell>
                  <p>{course.duration}</p>
                </TableCell>
                <TableCell className="edit">
                  <button
                    className="--btn --btn-primary"
                    onClick={() =>
                      router.push(`/admin/courses/editCourse/${course.id}`)
                    }
                  >
                    <RiEdit2Fill size={18} color="var(--secondary-color)" />
                  </button>
                  <button
                    className="--btn"
                    onClick={() => handleDelete(course.id)}
                  >
                    <RiDeleteBin2Fill size={18} color="red" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Courses;
