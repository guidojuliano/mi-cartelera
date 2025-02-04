import { useQuery } from "@tanstack/react-query";
import {
  fetchPeliculas,
  fetchPeliculaById,
  fetchProximasEstrenosHome,
} from "app/controller/controller";

export const usePeliculas = () => {
  const {
    data: peliculas,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["peliculas"],
    queryFn: fetchPeliculas,
  });
  return { cines: peliculas || [], isLoading, error, isError };
};

export const useProximasEstrenos = () => {
  const {
    data: proximasEstrenos,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["proximasEstrenos"],
    queryFn: fetchProximasEstrenosHome,
  });

  return {
    proximasEstrenos: proximasEstrenos || [],
    isLoading,
    error,
    isError,
  };
};

export const usePeliculaById = (id: string) => {
  const {
    data: pelicula,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["pelicula", id],
    queryFn: () => fetchPeliculaById(id),
    enabled: !!id,
  });
  return { pelicula, isLoading, error, isError };
};
