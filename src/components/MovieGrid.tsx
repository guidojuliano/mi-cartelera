"use client";

import React from "react";
import MovieCard from "./MovieCard";
import { useTheme } from "../context/ThemeContext";
import { usePeliculasEnCartelera } from "app/hooks/peliculasEnCartelera";

const MovieGrid = () => {
  const { theme } = useTheme();
  const { peliculasEnCartelera, isLoading, isError } =
    usePeliculasEnCartelera();

  if (isError) {
    return <div>Error al cargar las películas</div>;
  }

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h2
          className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          En Cartelera
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
          {[...Array(6)].map((_, index) => (
            <div key={index}>skeeton</div> // Usar index aquí está bien, ya que es un esqueleto
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h2
        className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        En Cartelera
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {peliculasEnCartelera.map((movie) => (
          <MovieCard
            key={movie.id} // Usar el ID único de la película
            duration={movie.detalles?.duracion}
            poster={movie.detalles?.poster}
            poster_url={movie.detalles?.poster_url}
            title={movie.detalles!.titulo}
            genre={movie.detalles?.genero}
            isPremiere={movie.estreno}
            rating={movie.detalles?.calificacion}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
