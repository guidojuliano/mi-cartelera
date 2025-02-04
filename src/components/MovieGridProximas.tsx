"use client";

import React from "react";
import MovieCard from "./MovieCard";
import { useProximasEstrenos } from "../hooks/querys/peliculas";
import { useTheme } from "../context/ThemeContext";

const MovieGridProximas = () => {
  const { theme } = useTheme();
  const { proximasEstrenos, isLoading, isError } = useProximasEstrenos();
  console.log(proximasEstrenos);
  if (isError) return <div>Error al cargar</div>;
  if (isLoading) return <div>Cargando...</div>;
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {proximasEstrenos.length > 0 && (
        <>
          <h2
            className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Proximamente
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
            {proximasEstrenos.map((movie) => (
              <MovieCard
                key={movie.id}
                title={movie.titulo}
                poster={movie.poster}
                poster_url={movie.poster_url}
                duration={movie.duracion}
                genre={movie.genero}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MovieGridProximas;
