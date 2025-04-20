
"use client"
import { useForm } from "react-hook-form";
import styles from "./request-service.module.scss";

import instance from "../../axios";
import { toast } from "sonner";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ServicesProps } from "@/types/types";


interface ClientsProps {
  teamMember:string,
  id:string
}
const RequestService = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ServicesProps>({defaultValues:{
    clientName:"",
    phone:"",
    website:"",
    marketingMemeber:""
  }});

  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await instance.get("Marketing");
      return response.data.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data:ServicesProps) => {
      await instance.post("Form/create", data);
    },
    onSuccess: () => {
      toast.success("Sent successfully");
      reset();
    },
    onError: () => {
      toast.error("Failed! Please try again");
    },
    retry: false,
  });
  const submitService = async(data:ServicesProps) =>{
    await mutate(data)
  }

  return (
    <div className={styles.services}>
      <form onSubmit={handleSubmit(submitService)}>
        <h2>Request a Service</h2>
        <div className={styles["form-inputs"]}>
          <div className={styles["input-group"]}>
            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              id="clientName"
              {...register("clientName", {
                required: "Name is required",
              })}
            />
            {errors.clientName && (
              <p className={styles.error}>{errors.clientName.message}</p>
            )}
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="phone">Clinet Phone</label>
            <input
              type="text"
              id="phone"
              {...register("phone", {
                required: "Phone Number is required",
                pattern: {
                  value:
                    /^\+?\d{1,4}?[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
                  message: "Please enter a valid phone number",
                },
              })}
            />
            {errors.phone && (
              <p className={styles.error}>{errors.phone.message}</p>
            )}
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="website">WebSite</label>
            <input
              type="text"
              id="website"
              {...register("website", {
                required: "Website is required",
              })}
            />
            {errors.website && (
              <p className={styles.error}>{errors.website.message}</p>
            )}
          </div>
          <div className={styles["input-group"]}>
            <label htmlFor="marketingMemeber">Your Name</label>
            <select
              id="marketingMemeber"
              {...register("marketingMemeber", {
                required: "Name is required",
              })}
            >
              <option value="">Select Name</option>
              {clients?.map((item:ClientsProps) => (
                <option key={item.id} value={item.teamMember}>
                  {item.teamMember}
                </option>
              ))}
            </select>
            {errors.marketingMemeber && (
              <p className={styles.error}>{errors.marketingMemeber.message}</p>
            )}
          </div>
        </div>
        <div className={styles.btn}>
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
};

export default RequestService;
