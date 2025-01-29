import { useFuncionById } from "./querys/funciones";
import { useCineById } from "./querys/cines";
import { usePeliculaById } from "./querys/peliculas";

export const useFuncionesCompleta = (id: string) => {
  const {
    funcion,
    isLoading: isLoadingFunciones,
    error: errorFunciones,
    isError: isErrorFunciones,
  } = useFuncionById(id);
  const {
    cine,
    isLoading: isLoadingCine,
    error: errorCine,
    isError: isErrorCine,
  } = useCineById(funcion?.cine_id.toString() || "");
  const {
    pelicula,
    isLoading: isLoadingPelicula,
    error: errorPelicula,
    isError: isErrorPelicula,
  } = usePeliculaById(funcion?.pelicula_id.toString() || "");

  return {
    funcion,
    cine,
    pelicula,
    isLoading: isLoadingFunciones || isLoadingCine || isLoadingPelicula,
    error: errorFunciones || errorCine || errorPelicula,
    isError: isErrorFunciones || isErrorCine || isErrorPelicula,
  };
};
