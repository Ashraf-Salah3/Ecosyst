"use client"
import Loading from "@/app/loading";
import instance from "@/axios";
import { ServicesProps } from "@/types/types";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


import { RiDeleteBin2Fill } from "react-icons/ri";
import { toast } from "sonner";
const Services = () => {
  const queryClient = useQueryClient();

  const {
    data: services,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await instance.get("Form/getAll");
      return response.data.data;
    },
  });

  const { mutate: onDelete } = useMutation({
    mutationKey: ["deleteService"],
    mutationFn: async (id:number) => {
      await instance.delete(`Form/${id}`);
    },
    onSuccess: () => {
      toast.success("Service deleted successfully");
      queryClient.invalidateQueries({queryKey :["services"]});
    },
    onError: () => {
      toast.error("Error deleting service");
    },
  });

  if (isLoading) return<Loading/>
  if (error) return <p className="loading">Faild!!!</p>;

  return (
    <div>
      <div className="container">
        <div className="main-title">
          <h1>Services</h1>
        </div>
        <TableContainer component={Paper} className="tableContainer">
          <Table className="table table-striped table-hover">
            <TableHead className="subhead">
              <TableRow>
                <TableCell>
                  <div>Id</div>
                </TableCell>
                <TableCell>
                  <div>Marketing Memeber</div>
                </TableCell>
                <TableCell>
                  <div>client Name</div>
                </TableCell>
                <TableCell>
                  <div>Phone</div>
                </TableCell>
                <TableCell>
                  <div>Website</div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {services?.map((service:ServicesProps, index:number) => (
                <TableRow key={index} className="subContent">
                  <TableCell>
                    <p>{service.id}</p>
                  </TableCell>
                  <TableCell>
                    <p>{service.marketingMemeber}</p>
                  </TableCell>
                  <TableCell>
                    <p>{service.clientName}</p>
                  </TableCell>
                  <TableCell>
                    <p>{service.phone}</p>
                  </TableCell>
                  <TableCell>
                    <p>{service.website}</p>
                  </TableCell>
                  <TableCell className="edit">
                    <button
                      className="--btn"
                      onClick={() => onDelete(service.id)}
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
    </div>
  );
};

export default Services;
