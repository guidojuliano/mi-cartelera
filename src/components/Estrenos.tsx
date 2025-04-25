"use client";

import { PeliculasPorFuncion } from "app/models/peliculas";
import Link from "next/link";
import Image from "next/image";
import { getPosterUrl } from "app/utils/getPosterUrl";
import { Clapperboard } from "lucide-react";
import { useTheme } from "app/context/ThemeContext";

interface EstrenosProps {
  peliculasEnCartelera: PeliculasPorFuncion[];
  isLoading: boolean;
  isError: boolean;
}

export const Estrenos = ({
  peliculasEnCartelera,
  isLoading,
  isError,
}: EstrenosProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={`rounded-xl p-6 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } shadow-lg`}
    >
      <div className="flex items-center gap-2 mb-6">
        <Clapperboard className="w-8 h-8 text-[#0C66DF]" />
        <h2
          className={`font-bold text-3xl ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          Películas en Cartelera
        </h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className="rounded-lg overflow-hidden shadow-lg bg-gray-200 animate-pulse"
            >
              <div className="h-80 bg-gray-300"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <p>Error al cargar las películas</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {peliculasEnCartelera.map((movie, index) => (
            <div
              key={index}
              className={`flex flex-col rounded-lg overflow-hidden shadow-lg ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              } hover:scale-105 transition-transform duration-300`}
            >
              {/* Título de la película */}
              <h3
                className={`p-4 text-lg font-semibold line-clamp-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {movie.detalles?.titulo || "Título no disponible"}
              </h3>

              {/* Poster de la película */}
              <div className="aspect-[2/3] overflow-hidden">
                <Image
                  src={
                    getPosterUrl(
                      movie.detalles?.poster,
                      movie.detalles?.poster_url
                    ) || "/assets/images/peliculas/poster/genericPoster.jpg"
                  }
                  alt={movie.detalles?.titulo || "Título no disponible"}
                  width={300}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Botón "Ver Horarios" */}
              <div className="mt-auto p-4">
                <Link
                  href={`/pelicula/${movie.detalles?.slug || "#"}`}
                  className="w-full flex items-center justify-center px-4 py-2 bg-[#0C66DF] text-white rounded-lg hover:bg-[#0C66DF]/90 transition-colors"
                >
                  Ver Horarios
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
