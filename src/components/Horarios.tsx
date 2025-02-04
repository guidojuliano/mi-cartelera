"useClient";

import Image from "next/image";
import { useTheme } from "app/context/ThemeContext";
import { Cine } from "app/models/cines";
import { Horario } from "app/models/horarios";
import { Clock, MapPin } from "lucide-react";
import { format, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import { es } from "date-fns/locale";

interface HorariosProps {
  cine: Cine;
  horarios: Horario[];
}

export const Horarios = ({ cine, horarios }: HorariosProps) => {
  const { theme } = useTheme();
  const imageLogo = `/assets${cine.logo}`;
  const imageIcono = `/assets${cine.icono}`;

  const groupedHorarios = horarios.reduce((acc, horario) => {
    const key = `${horario.pelicula_id}-${horario.idioma}-${horario.sala}`;

    if (!acc[key]) {
      acc[key] = {
        ...horario,
        horario: [horario.horario], // Inicializamos un array con el primer horario
      };
    } else {
      acc[key].horario.push(horario.horario); // Agregamos el horario al array existente
    }

    return acc;
  }, {} as Record<string, Omit<Horario, "horario"> & { horario: string[] }>);

  const horariosAgrupados = Object.values(groupedHorarios);

  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 0 }); // Domingo
  const endOfCurrentWeek = endOfWeek(today, { weekStartsOn: 0 }); // Sábado

  // Filtramos funciones dentro de la semana actual
  const funcionesSemanaActual = horariosAgrupados.filter((movie) => {
    const fechaDesde = new Date(movie.fecha_desde);
    const fechaHasta = new Date(movie.fecha_hasta);

    return isWithinInterval(today, { start: fechaDesde, end: fechaHasta });
  });

  return (
    <>
      {/* Theater Header */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-start gap-6">
          <div className="flex-shrink-0">
            <Image
              src={imageLogo}
              width={100}
              height={100}
              alt={cine.nombre}
              className="w-24 h-24 rounded-lg object-cover"
            />
          </div>
          <div className="flex-grow">
            <h1
              className={`text-3xl font-bold mb-2 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {cine.nombre}
            </h1>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-4">
              <MapPin className="w-4 h-4" />
              <span>{cine.direccion}</span>
            </div>
            <div className="flex items-center gap-4">
              <Image
                width={100}
                height={100}
                src={imageIcono}
                alt="Showcase Cinemas"
                className="w-10 h-10 rounded-full object-cover"
              />
              <span
                className={`font-medium ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {cine.cadena}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Movie Schedules */}
      <div
        className={`rounded-xl p-6 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-lg`}
      >
        <div className="flex items-center gap-2 mb-6">
          <Clock className="w-6 h-6 text-[#0C66DF]" />
          <h2
            className={`text-2xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Horarios de Hoy
          </h2>
        </div>

        {/* Muestra el rango de la semana actual */}
        <div className="flex items-center gap-2 mb-6">
          <h2
            className={`text-xl ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            Horarios válidos desde{" "}
            <span className="font-bold">
              {format(startOfCurrentWeek, "EEEE d 'de' MMMM", { locale: es })}{" "}
              al {format(endOfCurrentWeek, "EEEE d 'de' MMMM", { locale: es })}
            </span>
          </h2>
        </div>

        <div className="space-y-6">
          {funcionesSemanaActual.map((movie) => (
            <div
              key={movie.id}
              className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0"
            >
              <h3
                className={`text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {movie.detalles?.titulo}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {movie.sala} - {movie.idioma}
              </p>
              <div className="flex flex-wrap gap-2">
                {[...new Set(movie.horario)].map((time, index) => (
                  <button
                    key={`${movie.id}-${time}-${index}`}
                    className="px-4 py-2 bg-[#0C66DF]/10 hover:bg-[#0C66DF]/20 text-[#0C66DF] rounded-lg font-medium transition-colors"
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
