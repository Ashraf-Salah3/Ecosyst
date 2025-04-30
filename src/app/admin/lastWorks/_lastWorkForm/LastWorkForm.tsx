"use client";
import { CategoryPageProps, WorksPageProps } from "@/types/types";
import React, { useEffect, useState } from "react";
import styles from "./works.module.scss";
import { useFetchCategory } from "@/api/categoryApi";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import instance from "@/axios";
import { GoUpload } from "react-icons/go";
import { toast } from "sonner";

interface LastWorkFormProps {
  isEdit?: boolean;
  initialData?: WorksPageProps;
  workId?: number;
}
const LastWorkForm = ({ isEdit, initialData, workId }: LastWorkFormProps) => {
  const [loading, setLoading] = useState(false);
  const { data: categories } = useFetchCategory();

  const [image, setImage] = useState<File | string | undefined>(undefined);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorksPageProps>({
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      categoryId: initialData?.categoryId || "",
      attachment: initialData?.attachment || "",
      projectLink: initialData?.projectLink || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
      setImage(initialData.attachment?.trim());
    }
  }, [reset, initialData]);

  const { mutate } = useMutation({
    mutationKey: ["works"],
    mutationFn: async (data: WorksPageProps) => {
        setLoading(true)
      const formData = new FormData();
      formData.append("Name", data.name);
      formData.append("Description", data.description);
      formData.append("ProjectLink", data.projectLink);
      formData.append("CategoryId", data.categoryId);

      if (image instanceof File) formData.append("Attachment", image);

      if (isEdit && workId) {
        await instance.put(`Project/${workId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await instance.post("Project", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
    },
    onSuccess : ()=>{
        setLoading(false)
        toast.success(isEdit  ?"Project Updated Sucessfully" : "Project Added Sucessfully")
        reset()
    },
    onError:()=>{
        setLoading(false)
        toast.error("Faild please Try Again")
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const onSubmit = (data: WorksPageProps) => {
    mutate(data);
  };

  return (
    <div className={styles["project-container"]}>
      <h1>{isEdit ? "Edit Project" : "Add Project"}</h1>

      <div className={styles["form-container"]}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles["form-inputs"]}>
            {/* Name Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="Name">Name</label>
              <input
                id="Name"
                type="text"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && (
                <p className={styles["error"]}>{errors.name.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className={styles.inputGroup}>
              <label htmlFor="Description">Description</label>
              <input
                id="Description"
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
              <label htmlFor="ProjectLink">Project Link</label>
              <input
                id="ProjectLink"
                type="text"
                {...register("projectLink", {
                  required: "Project Link is required",
                })}
              />
              {errors.projectLink && (
                <p className={styles["error"]}>{errors.projectLink.message}</p>
              )}
            </div>

            {/* Category Selection */}
            <div className={styles.inputGroup}>
              <label htmlFor="CategoryId">Category</label>
              <select
                id="CategoryId"
                {...register("categoryId", {
                  required: "Category is required",
                })}
              >
                <option value="">Choose a category</option>
                {categories?.map((category: CategoryPageProps) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && (
                <p className={styles["error"]}>{errors.categoryId.message}</p>
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
                  {...register("attachment")}
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
                      :`url(${image})`
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
            <button type="submit" disabled={loading}>
              {loading ? "Loading..." :isEdit? "Save" : "Add Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LastWorkForm;
