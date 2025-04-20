import instance from "@/axios";
import { useQuery } from "@tanstack/react-query";

const fetchCategories = async ()=>{
    const response = await instance.get("Category");
    return response.data.data;
}

export const useFetchCategory = ()=>{
    return useQuery({
        queryKey:["category"],
        queryFn:fetchCategories
    })
}