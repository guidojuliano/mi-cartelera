/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import ThemeToggle from "../ThemeToggle";
import { useTheme } from "../../context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import { Divider, DropdownItem, DropdownMenu } from "./DropdownMenu";
import { useCines } from "app/hooks/querys/cines";

const Navbar = () => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const { cines, isLoading, isError } = useCines();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const entradasItems: DropdownItem[] = [
    { label: "PRECIOS", href: "/precios" },
    { label: "PROMOCIONES", href: "/novedades/promociones" },
    {
      label: "COMPRA ONLINE",
      href: "/novedades/como-comprar-entradas",
    },
    { type: "divider" }, // Ahora TypeScript entiende que este es un DividerItem
    { label: "GRATIS", href: "/novedades/gana-entradas" },
    { type: "divider" },
    { label: "CINES", href: "/precios" },
  ];

  const horariosItems: DropdownItem[] = [
    ...(cines?.map((cine) => ({
      label: cine.nombre.toUpperCase(),
      href: `/cines/${cine.id}`,
    })) || []),
    { type: "divider" },
    { label: "TODOS", href: "/cartelera" },
  ];

  const menuItems = [
    { label: "HORARIOS", href: "#", items: horariosItems },
    { label: "PELÍCULAS", href: "/peliculas" },
    { label: "ENTRADAS", href: "#", items: entradasItems },
    { label: "PRÓXIMAS", href: "/proximas" },
    { label: "NOVEDADES", href: "/novedades" },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  if (isError) return <div>Error</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <nav
      className={`${
        theme === "dark" ? "bg-black" : "bg-[#0C66DF]"
      } text-white sticky top-0 z-50`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              <Image src="/logo.png" alt="Logo" width={256} height={26} />
            </div>{" "}
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 relative">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => item.items && setOpenDropdown(item.label)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <div className="flex items-center space-x-1 cursor-pointer hover:text-white/80 transition-colors font-medium">
                  <Link href={item.href}>{item.label}</Link>
                  {item.items && <ChevronDown className="w-4 h-4" />}
                </div>
                {item.items && openDropdown === item.label && (
                  <DropdownMenu items={item.items} />
                )}
              </div>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-300 ease-in-out`}
      >
        <div className="px-4 pt-2 pb-4 space-y-2">
          {menuItems.map((item) => (
            <div key={item.label}>
              <div
                className="flex justify-between items-center py-2 px-4 text-lg font-medium hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                onClick={() => item.items && toggleDropdown(item.label)}
              >
                <Link href={item.href}>{item.label}</Link>
                {item.items && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </div>

              {item.items && openDropdown === item.label && (
                <div className="ml-4 space-y-2">
                  {item.items.map((subItem: any, index: number) => (
                    <React.Fragment key={index}>
                      {subItem.type === "divider" ? (
                        <Divider />
                      ) : (
                        <Link
                          href={subItem.href}
                          className="block py-2 px-4 text-sm hover:bg-white/10 rounded-lg transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
