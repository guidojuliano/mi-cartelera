"use client";

import { FaWhatsapp, FaInstagram } from "react-icons/fa";
import Link from "next/link";
import { useTheme } from "app/context/ThemeContext";

export const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer
      className={`rounded-xl m-4 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      } shadow-lg`}
    >
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span
          className={`text-sm  sm:text-center  ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          <Link href="/" className="hover:underline">
            www.miCartelera.com.ar{" "}
          </Link>
          - El cine en Corrientes y Resistencia
        </span>
        <ul className="flex flex-wrap items-center justify-center gap-6 mt-2 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <Link href="/estrenos" className="hover:underline ">
              Películas
            </Link>
          </li>
          <li>
            <a href="/precios" className="hover:underline ">
              Precios
            </a>
          </li>
          <li>
            <a href="/proximos" className="hover:underline ">
              Proximos Estrenos
            </a>
          </li>
          <li>
            <a
              href="https://wa.me/5493624849278?text=Hola%20Nico"
              target="_blank"
              className="hover:underline mx-2"
            >
              <FaWhatsapp size={30} />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/micartelera.com.ar/"
              target="blank"
              className="hover:underline"
            >
              <FaInstagram size={"30"} />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
