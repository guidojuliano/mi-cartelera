"use client";

import { useTheme } from "app/context/ThemeContext";
import { CreditCard, MapPin } from "lucide-react";

import { Horarios } from "./Horarios";
import { useParams } from "next/navigation";
import { useCineById } from "app/hooks/querys/cines";
import { usePreciosByCineId } from "app/hooks/querys/precios";
import { usePeliculasEnCarteleraPorCine } from "app/hooks/usePeliculasEnCarteleraByCineId";

export const CineDetail = () => {
  const { theme } = useTheme();
  const { idCine } = useParams<{ idCine: string }>();
  const {
    cine,
    isLoading: isLoadingCine,
    isError: isErrorCine,
  } = useCineById(idCine);
  const {
    precios,
    isLoading: isLoadingPrecios,
    isError: isErrorPrecios,
  } = usePreciosByCineId(idCine);

  const { peliculasEnCartelera, isLoading, isError } =
    usePeliculasEnCarteleraPorCine(idCine);

  if (isError || isErrorCine || isErrorPrecios) {
    <p>Error</p>;
  }

  if (isLoading || isLoadingCine || isLoadingPrecios) {
    return (
      <div
        className="inline-block h-8 w-8 animate-[spinner-grow_0.75s_linear_infinite] rounded-full bg-current align-[-0.125em] text-surface opacity-0 motion-reduce:animate-[spinner-grow_1.5s_linear_infinite] text-blue-500"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    );
  }

  return (
    <div className="lg:col-span-8 space-y-8">
      {/* Theater Header + Horarios */}
      <Horarios cine={cine!} horarios={peliculasEnCartelera} />

      {/* Prices */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-6">
          <CreditCard className="w-6 h-6 text-[#0C66DF]" />
          <h2
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Precios
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {precios.map((price) => (
            <div
              key={price.id}
              className={`p-4 rounded-lg ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <p
                className={`font-medium mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {price.descripcion}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 dark:text-gray-400">
                  {price.sala}
                </span>
                <span className="text-lg font-bold text-[#0C66DF]">
                  {price.precio}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Map */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-6">
          <MapPin className="w-6 h-6 text-[#0C66DF]" />
          <h2
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Ubicación
          </h2>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden">
          <iframe
            src={`${cine!.mapa}`}
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};
