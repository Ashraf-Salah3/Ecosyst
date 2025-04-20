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
import { RiDeleteBin2Fill } from "react-icons/ri";

import { toast } from "sonner";
import { FaPlus } from "react-icons/fa";
import styles from "./clients.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "@/axios";
import Loading from "@/app/loading";

interface ClientProps {id:number, teamMember:string}
const Clients = () => {
  const [showPopup, setShowPopup] = useState(false);
  const { register, handleSubmit, reset } = useForm<ClientProps>();
  const queryClient = useQueryClient();

  const {
    data: clients,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const response = await instance.get("Marketing");
      return response.data.data;
    },
  });

  const { mutate } = useMutation({
    mutationFn: async (data :ClientProps) => {
      await instance.post("Marketing", {
        teamMember: data.teamMember,
      });
    },
    onSuccess: () => {
      toast.success("Client Added Successfully");
      queryClient.invalidateQueries({queryKey : ["clients"]});
      reset();
      setShowPopup(false);
    },
    onError: () => {
      toast.error("Failed to add client");
    },
  });

  const { mutate: mutateDelete } = useMutation({
    mutationFn: async (id: number) => {
      await instance.delete(`Marketing/${id}`);
    },
    onSuccess: () => {
      toast.success("Client deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
    onError: () => {
      toast.error("Failed to delete client");
    },
  });
  

  const onSubmit = (data:ClientProps)=>{
    mutate(data)
  }

  const onDelete = (id:number) =>{
    mutateDelete(id)
  }

  if (isLoading) return <Loading/>;
  if (error) return <p className="loading">Failed!!</p>;

  return (
    <div>
      <div className="container">
        <div className="main-title">
          <h1>Clients</h1>
          <button onClick={() => setShowPopup(true)}>
            <FaPlus />
            Add New
          </button>
        </div>
        <TableContainer component={Paper} className="tableContainer">
          <Table className="table table-striped table-hover">
            <TableHead className="subhead">
              <TableRow>
                <TableCell>
                  <div>ID</div>
                </TableCell>
                <TableCell>
                  <div>Name</div>
                </TableCell>
                <TableCell>
                  <div>Actions</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients?.map((client:ClientProps) => (
                <TableRow key={client.id} className="subContent">
                  <TableCell>
                    <p>{client.id}</p>
                  </TableCell>
                  <TableCell>
                    <p>{client.teamMember}</p>
                  </TableCell>
                  <TableCell className="edit">
                    <button
                      className="--btn"
                      onClick={() => onDelete(client.id)}
                    >
                      <RiDeleteBin2Fill color="red" size={18} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {showPopup && (
        <div
          className={styles["popup-overlay"]}
          onClick={() => setShowPopup(false)}
        >
          <div
            className={styles["popup-content"]}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Add Client</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles["form-input"]}>
                <label htmlFor="teamMember">Client Name</label>
                <input
                  id="teamMember"
                  type="text"
                  {...register("teamMember", { required: true })}
                />
              </div>
              <div className={styles.btns}>
                <button
                  className={styles.closebtn}
                  type="button"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
                <button className={styles.submitbtn} type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
