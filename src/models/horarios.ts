import { Pelicula } from "./peliculas";

export interface Horario {
  detalles: Pelicula | null | undefined;
  id: number;
  fecha_desde: string;
  fecha_hasta: string;
  sala: string;
  idioma: string;
  horario: string;
  pelicula_id: number;
  cine_id: number;
  estreno: boolean;
}
