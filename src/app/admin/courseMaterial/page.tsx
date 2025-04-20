"use client";

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
import { useFetchCourses } from "@/api/coursesApi";
import { CoursesPageProps, MaterialType } from "@/types/types";
import { useState } from "react";
import { useFetchMaterial } from "@/api/materialApi";
import styles from "./material.module.scss";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const MaterialPage = () => {
    const queryClient = useQueryClient()
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm <MaterialType>({
    defaultValues: {
      title: "",
      courseId: "",
      description:""
    },
  });

  const { data: materials } = useFetchMaterial();
  const { data: courses } = useFetchCourses();

  const addMaterialHandler = () => {
    setShowPopup(true);
    setIsEdit(false);
    reset({ title: "", courseId: "" });
  };

  const editMaterialHandler = (material: MaterialType) => {
    reset({ title: material.title, courseId: String(material.courseId) });
    setEditId(material.id);
    setShowPopup(true);
    setIsEdit(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setIsEdit(false);
    setEditId(null);
  };

  const {mutate } = useMutation({
    mutationFn: async (data:MaterialType) => {
        const formData = new FormData()
        formData.append("Title" , data.title)
        formData.append("CourseId" , data.courseId)
        formData.append("Description" , data.description)
          if (isEdit && editId !== null) {
            await axios.put(`https://spidcourse.runasp.net/api/CourseMaterial/${editId}`, formData);
          } else {
            await axios.post("https://spidcourse.runasp.net/api/CourseMaterial", 
             formData
            );
        }
    },
    onSuccess : ()=>{
        toast.success("Material added successfully");
        queryClient.invalidateQueries({ queryKey: ['material'] });
        closePopup()

    },
    onError : ()=>{
        toast.error("Something went wrong");
    }
  })

  const onSubmit = async (data:MaterialType) => {
   mutate(data)
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`https://spidcourse.runasp.net/api/CourseMaterial/${id}`);
      toast.success("Deleted Successfully");
      queryClient.invalidateQueries({ queryKey: ['material'] });
    } catch {
      toast.error("Failed To Delete");
    }
  };

  return (
    <div className="container">
      <div className="main-title">
        <h1>Materiales</h1>
        <button onClick={addMaterialHandler}>
          <FaPlus />
          Add New
        </button>
      </div>
      <TableContainer component={Paper} className="tableContainer">
        <Table className="table table-striped table-hover">
          <TableHead className="subhead">
            <TableRow>
              <TableCell><div>Id</div></TableCell>
              <TableCell><div>Course Name</div></TableCell>
              <TableCell><div>Material</div></TableCell>
              <TableCell><div>Description</div></TableCell>
              <TableCell><div>Action</div></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {materials?.map((material: MaterialType, index: number) => (
              <TableRow key={index} className="subContent">
                <TableCell><p>{material.id}</p></TableCell>
                <TableCell><p>{material.courseName}</p></TableCell>
                <TableCell><p>{material.title}</p></TableCell>
                <TableCell><p>{material.description}</p></TableCell>
                <TableCell className="edit">
                  <button
                    className="--btn --btn-primary"
                    onClick={() => editMaterialHandler(material)}
                  >
                    <RiEdit2Fill size={18} color="var(--secondary-color)" />
                  </button>
                  <button
                    className="--btn"
                    onClick={() => handleDelete(Number(material.id))}
                  >
                    <RiDeleteBin2Fill size={18} color="red" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showPopup && (
        <div className={styles["popup-overlay"]} onClick={closePopup}>
          <div
            className={styles["popup-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{isEdit ? "Edit Material" : "Add Material"}</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles["form-input"]}>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  type="text"
                  {...register("title", { required: true })}
                />
              </div>
              <div className={styles["form-input"]}>
                <label htmlFor="description">Description</label>
                <input
                  id="description"
                  type="text"
                  {...register("description", { required: true })}
                />
              </div>
              <div className={styles["form-input"]}>
                <label htmlFor="course">Course</label>
                <select {...register("courseId", { required: true })}>
                  <option value="">Choose Course</option>
                  {courses?.map((course: CoursesPageProps) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className={styles.btns}>
                <button
                  className={styles.closebtn}
                  type="button"
                  onClick={closePopup}
                >
                  Cancel
                </button>
                <button className={styles.submitbtn} type="submit">
                  {isEdit ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaterialPage;
