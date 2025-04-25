"use client";

import { motion } from "framer-motion";

export default function DashboardHome() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="h-screen flex items-center justify-center bg-gradient-to-br from-[#0C66DF] to-[#002244] text-white"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-xl">
          BIENVENIDO NICO
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-medium text-white/80">
          Aca podrás gestionar tu web
        </p>
      </motion.div>
    </motion.div>
  );
}
