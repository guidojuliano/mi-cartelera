"use client";

import { Horarios } from "app/components/Horarios";
import { usePeliculasEnCarteleraPorCine } from "app/hooks/usePeliculasEnCarteleraByCineId";
import { Cine } from "app/models/cines";

interface CineCartelerProps {
  cine: Cine;
}

const CineCartelera = ({ cine }: CineCartelerProps) => {
  const { peliculasEnCartelera, isLoading, isError } =
    usePeliculasEnCarteleraPorCine(cine.id.toString());

  if (isLoading) return <p>Cargando horarios para {cine.nombre}...</p>;
  if (isError) return <p>Error al cargar cartelera de {cine.nombre}</p>;

  return <Horarios horarios={peliculasEnCartelera} cine={cine} />;
};

export default CineCartelera;
