import { useQueries, useQuery } from "@tanstack/react-query";
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

export const useCinesByIds = (ids: number[]) => {
  const results = useQueries({
    queries: ids.map((id) => ({
      queryKey: ["cine", id],
      queryFn: () => fetchCineById(id.toString()),
    })),
  });

  const isLoading = results.some((r) => r.isLoading);
  const isError = results.some((r) => r.isError);
  const cinesMap = Object.fromEntries(
    results.filter((r) => r.data).map((r, i) => [ids[i], r.data])
  );

  return { isLoading, isError, cinesMap };
};
