import { Funcion } from "app/models/funciones";
import { useFunciones } from "./querys/funciones";
import { useQueries } from "@tanstack/react-query";
import { fetchPeliculaById } from "app/controller/controller";

export const usePeliculasEnCartelera = () => {
  // Obtener funciones
  const {
    funciones,
    isLoading: isLoadingFunciones,
    error: errorFunciones,
    isError: isErrorFunciones,
  } = useFunciones();

  const peliculasUnicas = funciones
    ? funciones.reduce((acc: Funcion[], funcion: Funcion) => {
        if (!acc.some((item) => item.pelicula_id === funcion.pelicula_id)) {
          acc.push(funcion);
        }
        return acc;
      }, [])
    : [];

  // Obtener detalles de cada película única
  const peliculasDetalles = useQueries({
    queries: peliculasUnicas.map((funcion) => ({
      queryKey: ["pelicula", funcion.pelicula_id],
      queryFn: () => fetchPeliculaById(funcion.pelicula_id.toString()),
      enabled: !!funcion.pelicula_id,
    })),
  });

  // Combinar los datos de funciones y películas
  const peliculasEnCartelera = peliculasUnicas.map((funcion, index) => ({
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
