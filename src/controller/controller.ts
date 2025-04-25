import { supabase } from "app/services/supabase";
import { Cine } from "app/models/cines";
import { Funcion } from "app/models/funciones";
import { Pelicula } from "app/models/peliculas";
import { Precio } from "app/models/precios";

export const fetchCines = async (): Promise<Cine[]> => {
  const { data: cines, error } = await supabase.from("cines").select("*");
  if (error) throw new Error(error.message);
  return cines ? cines.map((cine) => ({ ...cine })) : [];
};

export const fetchCineById = async (id: string): Promise<Cine> => {
  const { data: cine, error } = await supabase
    .from("cines")
    .select("*")
    .eq("id", id)
    .single(); // Obtiene un solo registro

  if (error) throw new Error(error.message);
  return cine;
};

export const fetchPeliculas = async (): Promise<Pelicula[]> => {
  const { data: peliculas, error } = await supabase
    .from("peliculas")
    .select("*");
  if (error) throw new Error(error.message);
  return peliculas || [];
};

export const fetchProximasEstrenosHome = async (): Promise<Pelicula[]> => {
  const currentDate = new Date().toISOString(); // Fecha actual en formato ISO

  const { data: peliculas, error } = await supabase
    .from("peliculas")
    .select("*")
    .or(`estreno_rcia.gt.${currentDate},estreno_ctes.gt.${currentDate}`)
    .order("estreno_arg", { ascending: true }); // Ordenar por fecha más próxima

  if (error) throw new Error(error.message);
  return peliculas || [];
};

export const fetchProximasEstrenos = async (): Promise<Pelicula[]> => {
  const currentDate = new Date().toISOString(); // Fecha actual en formato ISO

  const { data: peliculas, error } = await supabase
    .from("peliculas")
    .select("*")
    .or(`estreno_rcia.gt.${currentDate},estreno_ctes.gt.${currentDate}`)
    .order("estreno_arg", { ascending: true }); // Ordenar por fecha más próxima

  if (error) throw new Error(error.message);
  return peliculas || [];
};

export const fetchPeliculaById = async (
  id: string
): Promise<Pelicula | null> => {
  const { data: pelicula, error } = await supabase
    .from("peliculas")
    .select("*")
    .eq("id", id)
    .single(); // Obtiene un solo registro

  if (error) throw new Error(error.message);
  return pelicula;
};

export const fetchPeliculaBySlug = async (
  slug: string
): Promise<Pelicula | null> => {
  const { data: pelicula, error } = await supabase
    .from("peliculas")
    .select("*")
    .eq("slug", slug)
    .single(); // Obtiene un solo registro

  if (error) throw new Error(error.message);
  return pelicula;
};

export const fetchFunciones = async (): Promise<Funcion[]> => {
  const { data: funciones, error } = await supabase
    .from("funciones")
    .select("*");
  if (error) throw new Error(error.message);
  return funciones ? funciones.map((cine) => ({ ...cine })) : [];
};

export const fetchFuncionById = async (id: string): Promise<Funcion | null> => {
  const { data: funcion, error } = await supabase
    .from("funciones")
    .select("*")
    .eq("id", id)
    .single(); // Obtiene un solo registro

  if (error) throw new Error(error.message);
  return funcion;
};

export const fetchFuncionByCineId = async (id: string): Promise<Funcion[]> => {
  const { data: funciones, error } = await supabase
    .from("funciones")
    .select("*")
    .eq("cine_id", id); // Devuelve múltiples resultados

  if (error) throw new Error(error.message);
  return funciones || []; // Retorna un array vacío si no hay funciones
};

export const fetchFuncionesByPeliculaId = async (
  id: string
): Promise<Funcion[]> => {
  const { data: funciones, error } = await supabase
    .from("funciones")
    .select("*")
    .eq("pelicula_id", id);
  if (error) throw new Error(error.message);
  return funciones ? funciones.map((funcion) => ({ ...funcion })) : [];
};

export const fetchPreciosByCineId = async (id: string): Promise<Precio[]> => {
  const { data: precios, error } = await supabase
    .from("precios")
    .select("*")
    .eq("cine_id", id);
  if (error) throw new Error(error.message);
  return precios ? precios.map((precio) => ({ ...precio })) : [];
};

export const fetchMovies = async (page: number, pageSize: number) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const {
    data: peliculas,
    error,
    count,
  } = await supabase
    .from("peliculas")
    .select("*", { count: "exact" }) // El count te da el total de registros
    .order("created_at", { ascending: false }) // orden opcional
    .range(from, to);

  if (error) throw error;
  return { peliculas, count };
};
