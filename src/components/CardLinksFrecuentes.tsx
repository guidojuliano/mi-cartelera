"use client";

import React from "react";
import { Ticket, CreditCard, Popcorn } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const QuickLinks = () => {
  const { theme } = useTheme();

  const cards = [
    {
      title: "Precio de entradas",
      icon: Ticket,
      gradient:
        theme === "dark"
          ? "from-purple-900 to-purple-600"
          : "from-[#332134] to-[#932192]",
      link: "/precio-entradas",
      fontStyle: "text-xl font-semibold text-white text-center",
    },
    {
      title: "Entradas Online",
      icon: CreditCard,
      gradient:
        theme === "dark"
          ? "from-purple-900 to-purple-600"
          : "from-[#332134] to-[#932192]",
      link: "/entradas-online",
      fontStyle: "text-xl font-semibold text-white text-center",
    },
    {
      title: "PROMO EN CINES",
      icon: Popcorn,
      gradient:
        theme === "dark"
          ? "from-rose-900 to-rose-600"
          : "from-[#931650] to-[#B6385D]",
      fontStyle: "text-xl font-semibold text-white text-center",
      link: "/promo-en-cines",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2
        className={`text-2xl md:text-3xl font-bold mb-6 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        Links Frecuentes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.link}
            className={`relative overflow-hidden rounded-xl bg-gradient-to-b ${card.gradient} 
              p-6 flex flex-col items-center justify-center min-h-[200px] 
              transform transition-transform duration-300 hover:scale-105 
              hover:shadow-xl cursor-pointer`}
          >
            <card.icon className="w-12 h-12 text-[#FDDC65] mb-4" />
            <h3 className={card.fontStyle}>{card.title}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default QuickLinks;
