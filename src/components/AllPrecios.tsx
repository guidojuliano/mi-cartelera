"use client";

import { Cine } from "app/models/cines";
import CineConPrecios from "./PreciosContainer";
import { useCines } from "app/hooks/querys/cines";

export const TodosLosCinesConPrecios = () => {
  const {
    cines,
    isLoading: isLoadingCines,
    isError: isErrorCines,
  } = useCines();

  if (isLoadingCines) {
    return <div>Cargando cines...</div>;
  }

  if (isErrorCines) {
    return <div>Error al cargar los cines</div>;
  }

  return (
    <div className="space-y-6">
      {cines.map((cine: Cine) => (
        <CineConPrecios key={cine.id} cine={cine} />
      ))}
    </div>
  );
};
