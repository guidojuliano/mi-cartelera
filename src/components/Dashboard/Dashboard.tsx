"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Film,
  Clock,
  DollarSign,
  PlusCircle,
  Edit,
  Trash2,
} from "lucide-react";
import { useTheme } from "app/context/ThemeContext";
import { Toaster, toast } from "sonner";
import { Dialog } from "@headlessui/react";
import { fetchMovies } from "app/controller/controller";
import { Pelicula } from "app/models/peliculas";
import { getPosterUrl } from "app/utils/getPosterUrl";

const Dashboard = () => {
  const { theme } = useTheme();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [movies, setMovies] = useState<Pelicula[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    const loadMovies = async () => {
      const { peliculas, count } = await fetchMovies(page, pageSize);
      setMovies(peliculas);
      setTotal(count || 0);
    };
    loadMovies();
  }, [page]);
  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleEdit = (id: string) => {
    toast.info("Editando elemento " + id);
  };

  const handleDelete = (id: string) => {
    toast.error("¿Estás seguro de que deseas eliminar este elemento?", {
      action: {
        label: "Eliminar",
        onClick: () => toast.success("Elemento eliminado correctamente"),
      },
    });
  };

  return (
    <div className="min-h-screen flex bg-gray-50 ">
      <Toaster position="top-center" expand={true} richColors />

      {/* Main Content */}
      <div className="flex-1">
        {/* Content Area */}
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Administrar Peliculas
              </h1>
              <p
                className={`mt-1 text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                Gestiona el contenido de tu plataforma
              </p>
            </div>
            <motion.button
              onClick={handleAdd}
              className="flex items-center gap-2 px-4 py-2 bg-[#0C66DF] text-white rounded-lg"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <PlusCircle className="w-5 h-5" />
              <span>Agregar</span>
            </motion.button>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-sm`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Film className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Total Películas
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    24
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-sm`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Funciones Hoy
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    48
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`p-6 rounded-xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              } shadow-sm`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p
                    className={`text-sm ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Ingresos
                  </p>
                  <p
                    className={`text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    $107,124
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Table */}
          <div
            className={`rounded-xl ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            } shadow-sm overflow-hidden`}
          >
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead
                className={theme === "dark" ? "bg-gray-900" : "bg-gray-50"}
              >
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Película
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Estreno
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Genero
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Última actualización
                  </th>
                  <th scope="col" className="relative px-6 py-4">
                    <span className="sr-only">Acciones</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {movies.map((movie) => (
                  <tr
                    key={movie.id}
                    className={`${
                      theme === "dark"
                        ? "hover:bg-gray-700/50"
                        : "hover:bg-gray-50"
                    } transition-colors`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <img
                          src={
                            getPosterUrl(movie.poster, movie.poster_url) ||
                            "/assets/images/peliculas/poster/genericPoster.jpg"
                          }
                          alt={movie.titulo}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                        <span
                          className={
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }
                        >
                          {movie.titulo}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs text-gray-500 dark:text-gray-400`}
                      >
                        {movie.estreno_arg}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {movie.genero}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      {movie.updated_at}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <motion.button
                          onClick={() => handleEdit(movie.id.toString())}
                          className={`p-2 rounded-lg ${
                            theme === "dark"
                              ? "hover:bg-gray-700"
                              : "hover:bg-gray-100"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit className="w-4 h-4 text-[#0C66DF]" />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(movie.id.toString())}
                          className={`p-2 rounded-lg ${
                            theme === "dark"
                              ? "hover:bg-gray-700"
                              : "hover:bg-gray-100"
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
                <div className="flex justify-between items-center mt-4">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Anterior
                  </button>

                  <span className="text-sm text-gray-500">
                    Página {page} de {Math.ceil(total / pageSize)}
                  </span>

                  <button
                    disabled={page * pageSize >= total}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                  >
                    Siguiente
                  </button>
                </div>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Dialog
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel
            className={`mx-auto max-w-lg w-full rounded-xl ${
              theme === "dark" ? "bg-gray-900" : "bg-white"
            } p-6 shadow-xl`}
          >
            <Dialog.Title
              className={`text-xl font-bold mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Agregar Película
            </Dialog.Title>

            <form className="space-y-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Título
                </label>
                <input
                  type="text"
                  className={`w-full px-3 py-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-white text-gray-900 border-gray-300"
                  } border focus:ring-2 focus:ring-[#0C66DF] focus:border-transparent`}
                  placeholder="Ingresa el título"
                />
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-1 ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Estado
                </label>
                <select
                  className={`w-full px-3 py-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-800 text-white border-gray-700"
                      : "bg-white text-gray-900 border-gray-300"
                  } border focus:ring-2 focus:ring-[#0C66DF] focus:border-transparent`}
                >
                  <option value="active">Activo</option>
                  <option value="upcoming">Próximo</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className={`px-4 py-2 rounded-lg ${
                    theme === "dark"
                      ? "bg-gray-800 text-white hover:bg-gray-700"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0C66DF] text-white rounded-lg hover:bg-[#0C66DF]/90"
                >
                  Guardar
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default Dashboard;
