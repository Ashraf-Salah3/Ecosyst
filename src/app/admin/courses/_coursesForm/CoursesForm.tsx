"use client"
import { useForm } from "react-hook-form";
import styles from "./courses-form.module.scss";
import axios from "axios";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { GoUpload } from "react-icons/go";
import { CoursesPageProps } from "@/types/types";
import { useMutation } from "@tanstack/react-query";

 interface CourseForm {
  isEdit?:boolean,
  initialData?:CoursesPageProps,
  courseId?:number
}

const CoursesForm = ({ isEdit, initialData, courseId } : CourseForm) => {
  const [image, setImage] = useState<File | string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CoursesPageProps>({
    defaultValues: {
      title: initialData ? initialData?.title || "" : "",
      description: initialData ? initialData?.description || "" : "",
      price: initialData ? initialData?.price || "" : "",
      duration: initialData ? initialData?.duration || "" : "",
      material: initialData? initialData?.material || "" : "",
    },
  });


  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setImage(initialData?.attachment);
    }
  }, [initialData, reset]);


  const handleFileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
    setImage(e.target.files[0]);
    }
  };

  const { mutate } = useMutation({
    mutationKey: ["courses"],
    mutationFn: async (data:CoursesPageProps) => {
      const formData = new FormData();
      formData.append("Title", data.title);
      formData.append("Description", data.description);
      formData.append("Price", data.price);
      formData.append("Duration", data.duration);

      if (image instanceof File) formData.append("attachment", image);

      if (isEdit && courseId) {

       
        await axios.put(
          `https://spidcourse.runasp.net/api/Courses/${courseId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        
      } else {
        await axios.post(
          "https://spidcourse.runasp.net/api/Courses",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
    },
    onSuccess: () => {
      toast.success("Course saved successfully!");
      reset();
    },
    onError: () => {
      toast.error( "Something went wrong");
    }
  });
  const onSubmit = (data:CoursesPageProps) => {
    mutate(data);
  };

  return (
    <div className={styles["project-container"]}>
      <h1>{isEdit ? "Edit Couse" : "Add Course"}</h1>

      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form-inputs"]}>
            {/* Name Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className={styles["error"]}>{errors.title.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="description">Description</label>
              <input
                id="description"
                type="text"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className={styles["error"]}>{errors.description.message}</p>
              )}
            </div>

            {/* ProjectLink Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="price">Price</label>
              <input
                id="price"
                type="text"
                {...register("price", {
                  required: "price Link is required",
                  pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                })}
              />
              {errors.price && (
                <p className={styles["error"]}>{errors.price.message}</p>
              )}
            </div>

            {/* Category Selection */}
            <div className={styles.inputGroup}>
              <label htmlFor="duration">Duration</label>
              <input
                id="duration"
                type="text"
                {...register("duration", {
                  required: "Duration is required",
                  pattern: /^[0-9]+$/,
                })}
              />
              {errors.duration && (
                <p className={styles["error"]}>{errors.duration.message}</p>
              )}
            </div>
          </div>

         
          {/* Upload Image */}
          <div className={styles["image-upload-section"]}>
            <div
              className={`${styles["image-upload"]} ${styles.cover}`}
              style={{
                border: image ? "none" : "2px dashed var(--secondary-color)",
              }}
            >
              <label htmlFor="file">
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
                <div
                  className={styles.productPicture}
                  style={{
                    backgroundImage: image
                      ? image instanceof File
                        ? `url(${URL.createObjectURL(image)})`
                        : `url(${image})`
                      : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    padding: image ? "5rem" : "0",
                  }}
                >
                  {!image && (
                    <div>
                      <GoUpload />
                      <h4>
                        Drag & Drop or <span>Choose file</span> to upload Image
                        Cover
                      </h4>
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className={styles["submit-btn"]}>
            <button type="submit">
              {isEdit ? "Edit Course" : "Add Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CoursesForm;
