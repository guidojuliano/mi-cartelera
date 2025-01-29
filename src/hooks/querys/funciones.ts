import { useQuery } from "@tanstack/react-query";
import { fetchFunciones, fetchFuncionById } from "app/controller/controller";

export const useFunciones = () => {
  const {
    data: funciones,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["funciones"],
    queryFn: fetchFunciones,
  });
  return { funciones: funciones || [], isLoading, error, isError };
};

export const useFuncionById = (id: string) => {
  const {
    data: funcion,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["funcion", id],
    queryFn: () => fetchFuncionById(id),
    enabled: !!id,
  });
  return { funcion, isLoading, error, isError };
};
