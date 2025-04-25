"use client";

import { RightSection } from "app/components/RightSection";
import { Estrenos } from "app/components/Estrenos";
import { usePeliculasEnCartelera } from "app/hooks/peliculasEnCartelera";

function Peliculas() {
  const { peliculasEnCartelera, isLoading, isError } =
    usePeliculasEnCartelera();
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Estrenos
            peliculasEnCartelera={peliculasEnCartelera}
            isError={isError}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:col-span-4">
          <RightSection />
        </div>
      </div>
    </div>
  );
}

export default Peliculas;
