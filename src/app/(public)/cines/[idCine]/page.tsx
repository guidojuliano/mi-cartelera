import { CineDetail } from "app/components/CineDetail";
import { RightSection } from "app/components/RightSection";
import { Metadata } from "next";
import { fetchCineById } from "app/controller/controller";

export async function generateMetadata({
  params,
}: {
  params: { idCine: string };
}): Promise<Metadata> {
  const cine = await fetchCineById(params.idCine); // Debe ser una función que NO use hooks

  return {
    title: cine ? `Cartelera de ${cine.nombre}` : "Cartelera de Cines",
    description: cine
      ? `Consulta la cartelera del cine ${cine.nombre}`
      : "Consulta la cartelera de los cines disponibles.",
  };
}

const CinePage = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <>
          <CineDetail />
          <RightSection />
        </>
      </div>
    </div>
  );
};

export default CinePage;
