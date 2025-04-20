"use client"

import {useState } from "react";
import styles from "./category.module.scss";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import instance from "@/axios";
import { CategoryPageProps } from "@/types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFetchCategory } from "@/api/categoryApi";

const Category = () => {
      const queryClient = useQueryClient()
  
  const [showPopup, setShowPopup] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm<CategoryPageProps>({
    defaultValues:{
      name:"",
    }
  });

  const {data:categories} = useFetchCategory()


  const handleAddCategory = () => {
    reset({name:""})
    setEditId(null);
    setIsEdit(false);
    setShowPopup(true);
  };

  const handleEditCategory = (category:CategoryPageProps) => {
    reset({name: category.name})
    setEditId(category.id);
    setIsEdit(true);
    setShowPopup(true);
  };

  const {mutate } = useMutation({
    mutationFn: async (data:CategoryPageProps) => {
          if (isEdit) {
            await instance.put(`Category/${editId}`, { Name: data.name });
          } else {
            await instance.post("Category", { Name: data.name })

        }
    },
    onSuccess : ()=>{
        toast.success("Material added successfully");
        queryClient.invalidateQueries({ queryKey: ['category'] });
        closePopup()
        reset({name:""})

    },
    onError : ()=>{
        toast.error("Something went wrong");
    }
  })

  const onSubmit = async (data:CategoryPageProps) => {
   mutate(data)
  };

  const handleDelete = async (id:number) => {
    try {
      await instance.delete(`/Category/${id}`);
      toast.success("Category deleted successfully");
      queryClient.invalidateQueries({ queryKey: ['category'] });
    } catch {
      toast.error("Faild To Delete Category");
    }
  };

  const closePopup = ()=>{
    setShowPopup(false);
  }

  return (
    <div className={styles["category-container"]}>
      <div className="main-title">
        <h1>Category</h1>
        <button onClick={handleAddCategory}>
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
                <div>Category Name</div>
              </TableCell>
              <TableCell>
                <div>Action</div>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories?.map((category: CategoryPageProps, index:number) => (
              <TableRow key={index} className="subContent">
                <TableCell>
                  <p>{category.id}</p>
                </TableCell>
                <TableCell>
                  <p>{category.name}</p>
                </TableCell>
                <TableCell className="edit">
                  <button
                    className="--btn --btn-primary"
                    onClick={() => handleEditCategory(category)}
                  >
                    <RiEdit2Fill size={18} />
                  </button>
                  <button
                    className="--btn"
                    onClick={() => handleDelete(category.id)}
                  >
                    <RiDeleteBin2Fill color="red" size={18} />
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
                <h2>Add Category</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className={styles["form-input"]}>
                    <label htmlFor="name">Category Name</label>
                    <input
                      id="name"
                      type="text"
                      {...register("name", { required: true })}
                    />
                  </div>
                  <div className={styles.btns}>
                    <button className={styles.closebtn} type="button" onClick={closePopup}>
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

export default Category;
