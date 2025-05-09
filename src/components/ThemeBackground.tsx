"use client";

import { useTheme } from "../context/ThemeContext";

const ThemeBackground = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0 -z-10 h-full w-full ">
      {theme === "dark" ? (
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      ) : (
        <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
      )}
    </div>
  );
};

export default ThemeBackground;
