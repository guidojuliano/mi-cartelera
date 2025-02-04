import { useQueries } from "@tanstack/react-query";
import { fetchPeliculaById } from "app/controller/controller";
import { useFuncionByCineId } from "./querys/funciones";

export const usePeliculasEnCarteleraPorCine = (idCine: string) => {
  // Obtener funciones del cine específico
  const {
    funciones,
    isLoading: isLoadingFunciones,
    error: errorFunciones,
    isError: isErrorFunciones,
  } = useFuncionByCineId(idCine);

  // Obtener detalles de cada película asociada a las funciones
  const peliculasDetalles = useQueries({
    queries: funciones.map((funcion) => ({
      queryKey: ["pelicula", funcion.pelicula_id],
      queryFn: () => fetchPeliculaById(funcion.pelicula_id.toString()),
      enabled: !!funcion.pelicula_id,
    })),
  });

  // Combinar los datos de funciones y películas
  const peliculasEnCartelera = funciones.map((funcion, index) => ({
    ...funcion,
    detalles: peliculasDetalles[index].data,
  }));

  // Verificar si alguna de las consultas de películas está cargando
  const isLoadingPeliculas = peliculasDetalles.some((query) => query.isLoading);

  // Verificar si hay algún error en las consultas de películas
  const isErrorPeliculas = peliculasDetalles.some((query) => query.isError);

  return {
    peliculasEnCartelera,
    isLoading: isLoadingFunciones || isLoadingPeliculas,
    error: errorFunciones || isErrorPeliculas,
    isError: isErrorFunciones || isErrorPeliculas,
  };
};
