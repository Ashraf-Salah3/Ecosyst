import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchMaterialById = async ({
  queryKey,
}: {
  queryKey: [string, string];
}) => {
  const [, courseId] = queryKey;
  const response = await axios.get(
    `https://spidcourse.runasp.net/api/CourseMaterial/GetByCourse/${courseId}`
  );
  return response.data.data;
};

const fetchMaterial = async () => {
  const response = await axios.get(
    `https://spidcourse.runasp.net/api/CourseMaterial`
  );
  return response.data.data;
};

export const useFetchMaterial = () => {
  return useQuery({
    queryKey: ["material"],
    queryFn: fetchMaterial,
  });
};

export const useFetchMaterialById = (courseId: string) => {
  return useQuery({
    queryKey: ["materialById", courseId],
    queryFn: fetchMaterialById,
  });
};
