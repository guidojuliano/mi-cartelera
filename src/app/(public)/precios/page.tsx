import { RightSection } from "app/components/RightSection";
import { TodosLosCinesConPrecios } from "app/components/AllPrecios";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Precios de los Cines en Resistencia y Corrientes",
    description: "Consulta los precios de las carteleras de los cines.",
  };
}

const Precios = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sección de cines (ocupa 8 columnas en pantallas grandes) */}
        <div className="lg:col-span-8 space-y-8">
          <TodosLosCinesConPrecios />
        </div>

        {/* RightSection (ocupa 4 columnas en pantallas grandes) */}
        <div className="lg:col-span-4">
          <RightSection />
        </div>
      </div>
    </div>
  );
};

export default Precios;
