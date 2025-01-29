"use client";

import { useCines } from "app/hooks/querys/cines";
import CardCines from "./CardCines/CardCines";

export const CinesContainer = () => {
  const { cines, isError, isLoading, error } = useCines();
  console.log(cines);

  if (isError) return <div>Error: {error?.message}</div>;

  const cinesRcia = cines.filter(
    (cine) => cine.localidad === "Resistencia Chaco"
  );
  const cinesCtes = cines.filter((cine) => cine.localidad === "Corrientes");
  return (
    <>
      <CardCines city="Corrientes" theaters={cinesCtes} loading={isLoading} />
      <CardCines city="Resistencia" theaters={cinesRcia} loading={isLoading} />
    </>
  );
};
