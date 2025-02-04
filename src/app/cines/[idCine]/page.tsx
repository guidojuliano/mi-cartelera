"use client";

import { CineDetail } from "app/components/CineDetail";
import { RightSection } from "app/components/RightSection";
import { useParams } from "next/navigation";
import { useCineById } from "app/hooks/querys/cines";
import { usePreciosByCineId } from "app/hooks/querys/precios";
import { usePeliculasEnCarteleraPorCine } from "app/hooks/usePeliculasEnCarteleraByCineId";

const CinePage = () => {
  const { idCine } = useParams<{ idCine: string }>();
  const {
    cine,
    isLoading: isLoadingCine,
    isError: isErrorCine,
  } = useCineById(idCine);
  const {
    precios,
    isLoading: isLoadingPrecios,
    isError: isErrorPrecios,
  } = usePreciosByCineId(idCine);

  const { peliculasEnCartelera, isLoading, isError } =
    usePeliculasEnCarteleraPorCine(idCine);

  if (isError || isErrorCine || isErrorPrecios) {
    <p>Error</p>;
  }

  //TODO Crear un spinner customizado con el logo de micartelera
  if (isLoading || isLoadingCine || isLoadingPrecios) {
    <div
      className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-surface opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-blue-500"
      role="status"
    >
      <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        Loading...
      </span>
    </div>;
  }

  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {cine && precios && peliculasEnCartelera && (
          <>
            <CineDetail
              cine={cine}
              horarios={peliculasEnCartelera}
              prices={precios}
            />
            <RightSection />
          </>
        )}
      </div>
    </div>
  );
};

export default CinePage;
