
import { WorksFilterProps } from "@/types/types";
import instance from "../axios"
import { useQuery } from "@tanstack/react-query";


const fetchWorks = async ({queryKey}: {queryKey:[string, WorksFilterProps]})=>{
    const [,worksFilter] = queryKey
    const response = await instance.get("Project", { params: worksFilter });
    return response.data.data;
}
const fetchSingleWork = async ({queryKey}: {queryKey:[string, number]})=>{
    const [,workId] = queryKey
    const response = await instance.get(`Project/${workId}`);
    return response.data.data;
}

export const useFetchWorks = (worksFilter:WorksFilterProps) =>{
    return useQuery({
        queryKey:["lastWorks", worksFilter],
        queryFn:fetchWorks
    })
}

export const useFetchSingleWork = (workId:number) =>{
    return useQuery({
        queryKey:["lastWorks", workId],
        queryFn:fetchSingleWork
    })
}