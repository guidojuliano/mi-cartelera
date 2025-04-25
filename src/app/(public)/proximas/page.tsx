"use client";

import { RightSection } from "app/components/RightSection";
import { useTheme } from "app/context/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, Star, X } from "lucide-react";
import { Metadata } from "next";
import { useState } from "react";

// export async function generateMetadata(): Promise<Metadata> {
//   return {
//     title: "Próximamente en cines - miCartelera.com.ar",
//     description:
//       "Consulta las películas horas de cines en Resistencia y Corrientes.",
//   };
// }

interface UpcomingMovie {
  id: string;
  title: string;
  releaseDate: string;
  duration: string;
  rating: number;
  synopsis: string;
  genre: string;
  poster: string;
  trailer: string;
}

const upcomingMovies: UpcomingMovie[] = [
  {
    id: "1",
    title: "Civil War",
    releaseDate: "18 de Abril, 2024",
    duration: "1h 49min",
    rating: 8.2,
    synopsis:
      "En un futuro próximo, un equipo de periodistas viaja por Estados Unidos durante una escalada de conflicto civil.",
    genre: "Drama",
    poster:
      "https://images.unsplash.com/photo-1547700055-b61cacebece9?auto=format&fit=crop&w=800",
    trailer: "#",
  },
  {
    id: "2",
    title: "Challengers",
    releaseDate: "25 de Abril, 2024",
    duration: "2h 11min",
    rating: 7.9,
    synopsis:
      "Sigue a tres jugadores de tenis que han estado compitiendo desde la adolescencia.",
    genre: "Drama",
    poster:
      "https://images.unsplash.com/photo-1542144582-1ba00456b5e3?auto=format&fit=crop&w=800",
    trailer: "#",
  },
  {
    id: "3",
    title: "The Fall Guy",
    releaseDate: "2 de Mayo, 2024",
    duration: "2h 07min",
    rating: 7.5,
    synopsis:
      "Colt Seavers es un doble de acción maltratado que se encuentra investigando la desaparición de una estrella de cine.",
    genre: "Acción",
    poster:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800",
    trailer: "#",
  },
  {
    id: "4",
    title: "Kingdom of the Planet of the Apes",
    releaseDate: "9 de Mayo, 2024",
    duration: "2h 25min",
    rating: 8.0,
    synopsis:
      'Muchos años después de los acontecimientos de "War", los simios son la especie dominante y los humanos viven en las sombras.',
    genre: "Sci-Fi",
    poster:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&w=800",
    trailer: "#",
  },
];

const Precios = () => {
  const { theme } = useTheme();
  const [selectedMovie, setSelectedMovie] = useState<UpcomingMovie | null>(
    null
  );
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sección de cines (ocupa 8 columnas en pantallas grandes) */}
        <div className="lg:col-span-8 space-y-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {upcomingMovies.map((movie) => (
                <motion.div
                  key={movie.id}
                  className="relative aspect-[2/3] cursor-pointer group"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5 },
                    },
                  }}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <motion.img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl"
                    layoutId={`poster-${movie.id}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-2">
                        {movie.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-[#0C66DF] text-white text-sm rounded-full">
                          {movie.genre}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Movie Details Modal */}
          <AnimatePresence>
            {selectedMovie && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center px-4"
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black"
                  onClick={() => setSelectedMovie(null)}
                />

                <motion.div
                  className={`relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  }`}
                  layoutId={`card-${selectedMovie.id}`}
                  initial={{ y: 50 }}
                  animate={{ y: 0 }}
                  exit={{ y: 50 }}
                >
                  <button
                    onClick={() => setSelectedMovie(null)}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <div className="flex flex-col md:flex-row">
                    <motion.div className="md:w-1/3">
                      <motion.img
                        src={selectedMovie.poster}
                        alt={selectedMovie.title}
                        className="w-full h-full object-cover"
                        layoutId={`poster-${selectedMovie.id}`}
                      />
                    </motion.div>

                    <div className="flex-1 p-6">
                      <motion.h2
                        className={`text-3xl font-bold mb-4 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {selectedMovie.title}
                      </motion.h2>

                      <motion.div
                        className="flex items-center gap-4 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.2 } }}
                      >
                        <div className="flex items-center gap-1">
                          <Star className="w-5 h-5 text-[#0C66DF]" />
                          <span
                            className={`font-medium ${
                              theme === "dark" ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {selectedMovie.rating}
                          </span>
                        </div>
                        <span className="px-3 py-1 bg-[#0C66DF]/10 text-[#0C66DF] rounded-full text-sm font-medium">
                          {selectedMovie.genre}
                        </span>
                      </motion.div>

                      <motion.div
                        className="flex flex-wrap gap-6 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.3 } }}
                      >
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Calendar className="w-5 h-5" />
                          <span>{selectedMovie.releaseDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                          <Clock className="w-5 h-5" />
                          <span>{selectedMovie.duration}</span>
                        </div>
                      </motion.div>

                      <motion.p
                        className={`mb-8 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, transition: { delay: 0.4 } }}
                      >
                        {selectedMovie.synopsis}
                      </motion.p>

                      <motion.div
                        className="flex flex-wrap gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          transition: { delay: 0.5 },
                        }}
                      >
                        <a
                          href={selectedMovie.trailer}
                          className="px-6 py-2 bg-[#0C66DF] text-white rounded-lg font-medium hover:bg-[#0C66DF]/90 transition-colors"
                        >
                          Ver Trailer
                        </a>
                        <button className="px-6 py-2 bg-[#0C66DF]/10 text-[#0C66DF] rounded-lg font-medium hover:bg-[#0C66DF]/20 transition-colors">
                          Recordarme
                        </button>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
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
