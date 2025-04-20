"use client"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  PaginationItem, Pagination, Stack
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { RiDeleteBin2Fill, RiEdit2Fill } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFetchWorks } from "@/api/worksApi";
import { useState } from "react";
import { WorksFilterProps, WorksPageProps } from "@/types/types";
import instance from "@/axios";
import Loading from "@/app/loading";
import { useQueryClient } from "@tanstack/react-query";


const LastWorks = () => {
  const queryClient = useQueryClient()
const router = useRouter()
const [worksFilter, setWorksFilter] = useState<WorksFilterProps>({
  PageIndex:1,
  PageSize:10
})
 
const {data:works ,isLoading} = useFetchWorks(worksFilter)
const totalPages = Math.ceil(works?.count / (works?.pageSize || 1));



const handlePageChange = (_event:React.ChangeEvent<unknown>, page:number) => {
  setWorksFilter((prev)=> ({...prev, PageIndex: page}))
};




  const handleDelete = async (id:number) => {
    try {
      await instance.delete(`Project/${id}`);
      toast.success("Project deleted successfully ");
      queryClient.invalidateQueries({queryKey:["lastWorks"]})

    } catch {
      toast.error("failed to delete project");
    }
  };

  if(isLoading) return <Loading/>

  return (
    <div className="container">
      <div className="main-title">
        <h1>Last Work</h1>
        <button onClick={() => router.push("/admin/lastWorks/addWork")}>
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
                <div>Project Name</div>
              </TableCell>
              <TableCell>
                <div>description</div>
              </TableCell>
              <TableCell>
                <div>Project Link</div>
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
            {works?.items?.map((work:WorksPageProps, index:number) => (
              <TableRow key={index} className="subContent">
                <TableCell>
                  <p>{work.id}</p>
                </TableCell>
                <TableCell>
                  <p>{work.name}</p>
                </TableCell>
                <TableCell>
                  <p>{work.description}</p>
                </TableCell>
                <TableCell>
                  <p>{work.projectLink}</p>
                </TableCell>
                <TableCell>
                  <p>{work.categoryName}</p>
                </TableCell>
                <TableCell className="edit">
                  <button
                    className="--btn --btn-primary"
                    onClick={() =>
                      router.push(`/admin/lastWorks/editWork/${work.id}`,)
                    }
                  >
                    <RiEdit2Fill size={18} color="var(--secondary-color)" />
                  </button>
                  <button
                    className="--btn"
                    onClick={() => handleDelete(work.id)}
                  >
                    <RiDeleteBin2Fill size={18} color="red" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {totalPages > 1 && (
        <div >
          <Stack spacing={2}>
            <Pagination
              count={totalPages}
              page={worksFilter?.PageIndex || 1}
              onChange={handlePageChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  sx={{
                    color: "var(--secondary-color)",
                    "&.Mui-selected": {
                      bgcolor: "var(--secondary-color)",
                      color: "black",
                    },
                    "&:hover": {
                      bgcolor: "#00e18b !important",
                    },
                  }}
                />
              )}
            />
          </Stack>
        </div>
      )}
    </div>
  );
};

export default LastWorks;
