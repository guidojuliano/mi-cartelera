import { useQuery } from "@tanstack/react-query";
import { fetchCines, fetchCineById } from "app/controller/controller";

export const useCines = () => {
  const {
    data: cines,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["cines"],
    queryFn: fetchCines,
  });
  return { cines: cines || [], isLoading, error, isError };
};

export const useCineById = (id: string) => {
  const {
    data: cine,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["cine", id],
    queryFn: () => fetchCineById(id),
    enabled: !!id,
  });
  return { cine, isLoading, error, isError };
};
