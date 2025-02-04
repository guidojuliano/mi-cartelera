import { fetchPreciosByCineId } from "app/controller/controller";
import { useQuery } from "@tanstack/react-query";

export const usePreciosByCineId = (id: string) => {
  const {
    data: precios,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["precios", id],
    queryFn: () => fetchPreciosByCineId(id),
    enabled: !!id,
  });
  return { precios: precios || [], isLoading, error, isError };
};
