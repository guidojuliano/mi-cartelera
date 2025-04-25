"use client";

import { useTheme } from "app/context/ThemeContext";
import { motion } from "framer-motion";
import {
  Film,
  Building2,
  Clock,
  ImagePlus,
  DollarSign,
  Calendar,
} from "lucide-react";
import { useState } from "react";

const SideBar = () => {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState("");

  const menuItems = [
    { id: "movies", label: "Películas", icon: Film, count: 24 },
    { id: "theaters", label: "Cines", icon: Building2, count: 6 },
    { id: "showtimes", label: "Funciones", icon: Clock, count: 48 },
    { id: "sliders", label: "Sliders", icon: ImagePlus, count: 3 },
    { id: "prices", label: "Precios", icon: DollarSign },
    { id: "validity", label: "Vigencias", icon: Calendar },
  ];
  return (
    <div className="w-64 flex-shrink-0 min-h-screen flex flex-col border-r border-gray-200 dark:border-gray-800">
      <div
        className={`h-full border-r ${
          theme === "dark"
            ? "bg-gray-900 border-gray-800"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex h-16 items-center gap-2 px-4 border-b border-gray-200 dark:border-gray-800">
          <Film className="w-8 h-8 text-[#0C66DF]" />
          <h2
            className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            miCartelera
          </h2>
        </div>
        <nav className="flex-1 space-y-1 p-4">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                activeSection === item.id
                  ? "bg-[#0C66DF] text-white"
                  : `${
                      theme === "dark"
                        ? "text-gray-300 hover:bg-gray-800"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count && (
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    activeSection === item.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {item.count}
                </span>
              )}
            </motion.button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
