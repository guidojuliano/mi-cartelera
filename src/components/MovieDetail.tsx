"use client";

import { useTheme } from "app/context/ThemeContext";
import { motion } from "framer-motion";
import {
  Star,
  Clock,
  Calendar,
  Play,
  Share2,
  Bell,
  MapPin,
} from "lucide-react";
import { usePeliculaBySlug } from "app/hooks/querys/peliculas";
import { getPosterUrl } from "app/utils/getPosterUrl";
import { useFuncionesByPeliculaId } from "app/hooks/querys/funciones";
import { useCinesByIds } from "app/hooks/querys/cines";
import { useParams } from "next/navigation";
import parseDuracion from "app/utils/formatDuration";

const MovieDetail = () => {
  const { theme } = useTheme();
  const params = useParams();

  // Si tu ruta es algo como: /pelicula/[slug]
  const slug = typeof params?.slug === "string" ? params.slug : undefined;

  const { pelicula, isLoading, isError } = usePeliculaBySlug(slug!);
  const peliculaId = pelicula?.id?.toString();
  const {
    funciones,
    isLoading: isLoadingFunciones,
    isError: isErrorFunciones,
  } = useFuncionesByPeliculaId(peliculaId ?? "", {
    enabled: !!peliculaId,
  });

  const cineIds = [...new Set(funciones?.map((f) => f.cine_id))].filter(
    Boolean
  );
  const { cinesMap, isLoading: isLoadingCines } = useCinesByIds(cineIds);

  const funcionesPorCine = funciones.reduce(
    (acc, funcion) => {
      const cineId = funcion.cine_id;
      const cine = cinesMap[cineId];

      if (!acc[cineId]) {
        acc[cineId] = {
          nombre: cine?.nombre || "Cine desconocido",
          funcionesPorIdioma: {},
        };
      }

      if (!acc[cineId].funcionesPorIdioma[funcion.idioma]) {
        acc[cineId].funcionesPorIdioma[funcion.idioma] = [];
      }

      acc[cineId].funcionesPorIdioma[funcion.idioma].push(funcion);

      return acc;
    },
    {} as Record<
      string,
      {
        nombre: string;
        funcionesPorIdioma: Record<string, typeof funciones>;
      }
    >
  );

  if (
    isError ||
    isLoading ||
    !pelicula ||
    isErrorFunciones ||
    isLoadingFunciones
  ) {
    return <p>Error</p>;
  }

  if (isLoadingCines) return <div>Cargando cines...</div>;

  return (
    <div className="min-h-screen lg:col-span-8 space-y-8">
      {/* Mobile Hero Section */}
      <div className="md:hidden">
        <motion.div
          className="relative h-[80vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
          <img
            src={
              getPosterUrl(pelicula.poster, pelicula.poster_url) ||
              "/assets/images/peliculas/poster/genericPoster.jpg"
            }
            alt={pelicula.titulo}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 z-20 p-6 space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-3xl font-bold text-white mb-1">
                {pelicula.titulo}
              </h1>
              <p className="text-lg text-gray-300">{pelicula.titulo_orig}</p>
            </motion.div>

            <motion.div
              className="flex items-center gap-4 text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-bold">{pelicula.calificacion}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-300" />
                <span className="text-sm">
                  {parseDuracion(pelicula.duracion)}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 text-gray-300" />
                <span className="text-sm">{pelicula.estreno_arg}</span>
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <span className="px-3 py-1 bg-[#0C66DF] rounded-full text-xs font-medium text-white">
                {pelicula.genero}
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Hero Section */}
      <motion.div
        className="relative h-[70vh] overflow-hidden hidden md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
          <img
            src={
              getPosterUrl(pelicula.slider, pelicula.slider_url) ||
              "/assets/images/slider/generic_slider.jpg"
            }
            alt={pelicula.titulo}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-12 gap-8 items-center">
            <motion.div
              className="col-span-3"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src={
                    getPosterUrl(pelicula.poster, pelicula.poster_url) ||
                    "/assets/images/peliculas/poster/genericPoster.jpg"
                  }
                  alt={pelicula.titulo}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              className="col-span-9 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-5xl font-bold mb-2">{pelicula.titulo}</h1>
              <p className="text-xl text-gray-300 mb-6">
                {pelicula.titulo_orig}
              </p>

              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-400" />
                  <span className="text-xl font-bold">
                    {pelicula.calificacion}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-300" />
                  <span>{pelicula.duracion}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gray-300" />
                  <span>{pelicula.estreno_arg}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                <span className="px-3 py-1 bg-[#0C66DF] rounded-full text-xs font-medium text-white">
                  {pelicula.genero}
                </span>
              </div>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-[#0C66DF] rounded-lg font-medium"
                >
                  <Play className="w-5 h-5" />
                  <span>Ver Trailer</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg font-medium backdrop-blur-sm"
                >
                  <Share2 className="w-5 h-5" />
                  <span>Compartir</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 rounded-lg font-medium backdrop-blur-sm"
                >
                  <Bell className="w-5 h-5" />
                  <span>Recordatorio</span>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile Action Buttons */}
      <div className="md:hidden sticky top-0 z-30 bg-[#0C66DF] p-4 flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white rounded-lg font-medium text-[#0C66DF]"
        >
          <Play className="w-5 h-5" />
          <span>Ver Trailer</span>
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-2.5 bg-white/10 rounded-lg"
        >
          <Share2 className="w-5 h-5 text-white" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-2.5 bg-white/10 rounded-lg"
        >
          <Bell className="w-5 h-5 text-white" />
        </motion.button>
      </div>

      {/* Content Sections */}
      <div className={`${theme === "dark" ? "bg-black" : "bg-white"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Synopsis */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className={`text-xl md:text-2xl font-bold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Sinopsis
                </h2>
                <p
                  className={`text-base md:text-lg leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  {pelicula.sinopsis}
                </p>
              </motion.section>

              {/* Cast & Crew */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2
                  className={`text-xl md:text-2xl font-bold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Reparto y Equipo
                </h2>
                <div
                  className={`space-y-4 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <p>
                    <span className="font-medium">Director:</span>{" "}
                    {pelicula.director}
                  </p>
                  <p>
                    <span className="font-medium">Reparto:</span>{" "}
                    {pelicula.protagonistas}
                  </p>
                </div>
              </motion.section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Showtimes */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`rounded-xl p-4 md:p-6 ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-50"
                }`}
              >
                <h2
                  className={`text-xl md:text-2xl font-bold mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Horarios
                </h2>

                <div className="space-y-8">
                  {Object.entries(funcionesPorCine).map(
                    ([cineId, cineData]) => (
                      <div key={cineId} className="space-y-6">
                        {/* Cine */}
                        <div className="flex items-start gap-3">
                          <MapPin
                            className={`w-5 h-5 mt-1 ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                          />
                          <h3
                            className={`font-semibold text-lg ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {cineData.nombre}
                          </h3>
                        </div>

                        {/* Idiomas */}
                        {Object.entries(cineData.funcionesPorIdioma).map(
                          ([idioma, funcionesIdioma]) => (
                            <div key={idioma} className="space-y-2">
                              <p
                                className={`font-medium ${
                                  theme === "dark"
                                    ? "text-gray-200"
                                    : "text-gray-800"
                                }`}
                              >
                                Idioma: {idioma}
                              </p>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                {funcionesIdioma.flatMap((funcion) =>
                                  funcion.horario.split(" - ").map((time) => (
                                    <button
                                      key={`${funcion.id}-${time}`}
                                      className="px-4 py-2 bg-[#0C66DF]/10 hover:bg-[#0C66DF]/20 text-[#0C66DF] rounded-lg font-medium transition-colors text-center"
                                    >
                                      {time}
                                    </button>
                                  ))
                                )}
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )
                  )}
                </div>
              </motion.section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
