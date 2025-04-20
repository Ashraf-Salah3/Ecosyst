"use client"
import { useFetchSingleWork } from "@/api/worksApi";
import LastWorkForm from "../../_lastWorkForm/LastWorkForm";
import { useParams } from "next/navigation";

const EditWork = () => {
  const {id} = useParams()
  const workId = id ? id as string :""

  const {data:work} = useFetchSingleWork(Number(workId))
 return (
  <LastWorkForm isEdit={true} workId={Number(workId)} initialData={work}/>
 )

};

export default EditWork;
