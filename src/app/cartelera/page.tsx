"use client";

import { RightSection } from "app/components/RightSection";
import { useCines } from "app/hooks/querys/cines";
import CineCartelera from "app/components/CineCartelera";

const Cartelera = () => {
  const {
    cines,
    isLoading: isLoadingCines,
    isError: isErrorCines,
  } = useCines();

  // Si hay un error cargando los cines
  if (isErrorCines) return <p>Error al cargar los cines</p>;

  // Si todavía están cargando los cines
  if (isLoadingCines)
    return (
      <div
        className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-surface opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-blue-500"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sección de cines (ocupa 8 columnas en pantallas grandes) */}
        <div className="lg:col-span-8 space-y-8">
          {cines.map((cine) => (
            <CineCartelera key={cine.id} cine={cine} />
          ))}
        </div>

        {/* RightSection (ocupa 4 columnas en pantallas grandes) */}
        <div className="lg:col-span-4">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default Cartelera;
