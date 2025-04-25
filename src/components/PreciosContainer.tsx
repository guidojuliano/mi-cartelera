"use client";

import Image from "next/image";
import { useTheme } from "app/context/ThemeContext";
import { Cine } from "app/models/cines";
import { ChevronDown, ChevronUp, CreditCard, MapPin } from "lucide-react";
import { usePreciosByCineId } from "app/hooks/querys/precios";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const CineConPrecios = ({ cine }: { cine: Cine }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(true);
  const imageLogo = `/assets${cine.logo}`;
  const imageIcono = `/assets${cine.icono}`;

  const {
    precios,
    isLoading: isLoadingPrecios,
    isError: isErrorPrecios,
  } = usePreciosByCineId(cine.id.toString());

  const togglePrecios = () => {
    setIsOpen(!isOpen); // Cambia el estado para mostrar/ocultar los precios
  };

  if (isLoadingPrecios) {
    return <div>Cargando precios...</div>;
  }

  if (isErrorPrecios) {
    return <div>Error al cargar los precios</div>;
  }

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-lg ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      {/* Header del cine (haz clic para desplegar/ocultar precios) */}
      <div
        className="p-4 sm:p-6 cursor-pointer"
        onClick={togglePrecios}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && togglePrecios()}
      >
        <div className="flex items-start gap-4 sm:gap-6">
          <div className="flex-shrink-0">
            <Image
              src={imageLogo}
              width={80}
              height={80}
              alt={cine.nombre}
              className="w-16 h-16 sm:w-24 sm:h-24 rounded-lg object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="flex items-center justify-between">
              <h1
                className={`text-xl sm:text-3xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {cine.nombre}
              </h1>
              <div>
                {isOpen ? (
                  <ChevronUp className="w-6 h-6 text-[#0C66DF]" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-[#0C66DF]" />
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-2 sm:mb-4">
              <MapPin className="w-4 h-4" />
              <span>{cine.direccion}</span>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Image
                width={40}
                height={40}
                src={imageIcono}
                alt="Showcase Cinemas"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <span
                className={`text-sm sm:text-base font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {cine.cadena}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Precios (se muestra/oculta según el estado) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} // Estado inicial
            animate={{ opacity: 1, height: "auto" }} // Estado animado
            exit={{ opacity: 0, height: 0 }} // Estado al salir
            transition={{ duration: 0.3 }} // Duración de la transición
          >
            <div
              className={`p-4 sm:p-6 border-t ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <CreditCard className="w-6 h-6 text-[#0C66DF]" />
                <h2
                  className={`text-xl sm:text-2xl font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Precios
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {isLoadingPrecios ? (
                  <p>Cargando precios...</p>
                ) : isErrorPrecios ? (
                  <p>Error al cargar los precios</p>
                ) : (
                  precios.map((price) => (
                    <div
                      key={price.id}
                      className={`p-3 sm:p-4 rounded-lg ${
                        theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                      }`}
                    >
                      <p
                        className={`text-sm sm:text-base font-medium mb-2 ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {price.descripcion}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                          {price.sala}
                        </span>
                        <span className="text-base sm:text-lg font-bold text-[#0C66DF]">
                          {price.precio}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CineConPrecios;
