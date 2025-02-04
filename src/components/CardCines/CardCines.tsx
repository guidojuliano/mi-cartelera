"use client";

import React from "react";
import { useTheme } from "../../context/ThemeContext";
import Image from "next/image";
import { Cine } from "app/models/cines";
import { SkeletonCardCines } from "./SkeletonCardCines";

interface CardCinesProps {
  city: string;
  theaters: Cine[];
  loading: boolean;
}

const CardCines = ({ city, theaters, loading }: CardCinesProps) => {
  const { theme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2
        className={`text-2xl md:text-3xl font-bold mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Cines en {city}
      </h2>
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <SkeletonCardCines />
          <SkeletonCardCines />
          <SkeletonCardCines />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {theaters.map((theater) => (
          <a
            key={theater.id}
            href={`/theater/${theater.id}`}
            className={`group relative block rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
              theme === "dark" ? "bg-gray-800/50" : "bg-white"
            }`}
          >
            <div className="aspect-[16/9] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <Image
                src="/assets/images/cines/sala_cine.jpg"
                alt={theater.nombre}
                layout="fill"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Logos Container */}
              <div className="absolute top-4 right-4 flex items-center gap-3 z-20">
                {/* Theater Logo */}
                <div
                  className={`w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Image
                    src={`/assets${theater.logo}`}
                    alt={theater.nombre}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Chain Logo */}
                <div
                  className={`w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-lg ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  <Image
                    src={`/assets${theater.icono}`}
                    alt={theater.nombre}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#0C66DF] transition-colors">
                  {theater.nombre}
                </h3>
                <p className="text-white/80 text-sm">{theater.direccion}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CardCines;
