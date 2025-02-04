"use client";

import React from "react";
import { useTheme } from "app/context/ThemeContext";
import {
  Search,
  Star,
  TrendingUp,
  ExternalLink,
  Clapperboard,
  Popcorn,
  LayoutList,
} from "lucide-react";
import Link from "next/link";
import { getPosterUrl } from "app/utils/getPosterUrl";
import { usePeliculasEnCartelera } from "app/hooks/peliculasEnCartelera";
import { useProximasEstrenos } from "app/hooks/querys/peliculas";
import { useCines } from "app/hooks/querys/cines";
import Image from "next/image";

const popularLinks = [
  { title: "Precios", href: "/precios" },
  { title: "Promociones 2x1", href: "novedades/promociones" },
  { title: "Comprar Entradas", href: "/novedades/como-comprar-entradas" },
  { title: "Películas", href: "/estrenos" },
  { title: "Horarios", href: "/cartelera" },
  { title: "Entradas Gratis", href: "/novedades/gana-entradas" },
  { title: "Avant Premiere", href: "/novedades/avant-premiere" },
];

const catergories = [
  { title: "Streaming", href: "/novedades/category/streaming" },
  { title: "Estrenos", href: "/novedades/category/estrenos" },
  { title: "Películas", href: "/novedades/category/peliculas" },
  { title: "Cines", href: "/novedades/category/cines" },
  { title: "Cinemacenter", href: "/novedades/category/cinemacenter" },
  {
    title: "Los Cines de la Costa",
    href: "/novedades/category/los-cines-de-la-costa",
  },
];

export const RightSection = () => {
  const { theme } = useTheme();

  const { peliculasEnCartelera, isLoading, isError } =
    usePeliculasEnCartelera();

  const {
    proximasEstrenos,
    isLoading: isLoadingProximos,
    isError: isErrorProximos,
  } = useProximasEstrenos();

  const {
    cines,
    isError: isErrorCines,
    isLoading: isLoadingCines,
  } = useCines();

  return (
    <div className="lg:col-span-4 space-y-6">
      {/* Search Box */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar..."
            className={`w-full pl-10 pr-4 py-2 rounded-lg ${
              theme === "dark"
                ? "bg-gray-700 text-white placeholder-gray-400 border-gray-600"
                : "bg-gray-50 text-gray-900 placeholder-gray-500 border-gray-300"
            } border focus:ring-2 focus:ring-[#0C66DF] focus:border-transparent`}
          />
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Powered by Google
        </div>
      </div>

      {/* Advertisement */}
      <div
        className={`rounded-xl aspect-square ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg overflow-hidden`}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#0C66DF] to-purple-600 flex items-center justify-center text-white">
          Espacio Publicitario
        </div>
      </div>

      {/* Satisfaction Survey */}
      <Link
        href="/novedades/encuesta-nfc"
        className={`block rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg hover:shadow-xl transition-shadow group`}
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-[#0C66DF]/10 flex items-center justify-center">
            <Star className="w-6 h-6 text-[#0C66DF]" />
          </div>
          <div>
            <h3
              className={`font-bold text-2xl ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              ¿Que tal estuvo tu última visita al cine?
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-500">
              Encuesta de Satisfacción
            </p>
          </div>
        </div>
        <button className="w-full py-2 bg-[#0C66DF] text-white rounded-lg font-medium hover:bg-[#0C66DF]/90 transition-colors flex items-center justify-center gap-2">
          <span>Completar encuesta</span>
          <ExternalLink className="w-4 h-4" />
        </button>
      </Link>

      {/* Most Viewed */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-8 h-8 text-[#0C66DF]" />
          <h2
            className={`font-bold text-2xl ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Lo más consultado
          </h2>
        </div>
        <div className="space-y-4">
          {popularLinks.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center justify-between group"
            >
              <span
                className={`text-xl group-hover:text-[#0C66DF] transition-colors ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {link.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      {/* Cartelera */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Clapperboard className="w-8 h-8 text-[#0C66DF]" />
          <h2
            className={`font-bold text-2xl ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Películas en Cartelera
          </h2>
        </div>
        {isLoading && isError ? (
          <>
            <div
              className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-surface opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-blue-500"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            ;
          </>
        ) : (
          <>
            {peliculasEnCartelera.map((movie, index) => (
              <Link
                key={index}
                href={`/pelicula/${movie.detalles?.slug || "#"}`}
                className="flex items-center group p-2"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <Image
                    src={
                      getPosterUrl(
                        movie.detalles?.poster,
                        movie.detalles?.poster_url
                      ) || "/assets/images/peliculas/poster/genericPoster.jpg"
                    }
                    alt={movie.detalles?.titulo || "Título no disponible"}
                    width={80}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span
                  className={`text-xl ml-4 group-hover:text-[#0C66DF] transition-colors ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {movie.detalles?.titulo || "Título no disponible"}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
      {/* Advertisement */}
      <div
        className={`rounded-xl aspect-square ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg overflow-hidden`}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#0C66DF] to-purple-600 flex items-center justify-center text-white">
          Espacio Publicitario
        </div>
      </div>
      {/* Proximas */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Popcorn className="w-8 h-8 text-[#0C66DF]" />
          <h2
            className={`font-bold text-2xl ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Próximos Estrenos
          </h2>
        </div>
        {isLoadingProximos && isErrorProximos ? (
          <>
            <div
              className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-surface opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-blue-500"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            ;
          </>
        ) : (
          <>
            {proximasEstrenos.map((movie, index) => (
              <Link
                key={index}
                href={`/pelicula/${movie?.slug}`}
                className="flex items-center group p-2"
              >
                <div className="aspect-[2/3] overflow-hidden">
                  <Image
                    src={`${getPosterUrl(movie?.poster, movie?.poster_url)}`}
                    alt={movie!.titulo}
                    width={80}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <span
                  className={`text-xl ml-4 group-hover:text-[#0C66DF] transition-colors ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {movie?.titulo}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
      {/* Categories */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-4">
          <LayoutList className="w-8 h-8 text-[#0C66DF]" />
          <h2
            className={`font-bold text-2xl ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Categorías
          </h2>
        </div>
        <div className="space-y-4">
          {catergories.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="flex items-center justify-between group"
            >
              <span
                className={`text-xl group-hover:text-[#0C66DF] transition-colors ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {link.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      {/* Cines */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-4">
          <Popcorn className="w-8 h-8 text-[#0C66DF]" />
          <h2
            className={`font-bold text-2xl ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Cines
          </h2>
        </div>
        {isLoadingCines && isErrorCines ? (
          <>
            <div
              className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-surface opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-blue-500"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
            ;
          </>
        ) : (
          <>
            {cines.map((cine, index) => (
              <Link
                key={index}
                href={`/cine/${cine?.id}`}
                className="flex items-center group p-2"
              >
                <div className="overflow-hidden">
                  <Image
                    src={`/assets${cine.logo}`}
                    alt={cine!.nombre}
                    width={50}
                    height={50}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <span
                  className={`text-xl ml-4 group-hover:text-[#0C66DF] transition-colors ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {cine?.nombre}
                </span>
              </Link>
            ))}
          </>
        )}
      </div>
      {/* Advertisement */}
      <div
        className={`rounded-xl aspect-square ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg overflow-hidden`}
      >
        <div className="w-full h-full bg-gradient-to-br from-[#0C66DF] to-purple-600 flex items-center justify-center text-white">
          Espacio Publicitario
        </div>
      </div>
    </div>
  );
};
