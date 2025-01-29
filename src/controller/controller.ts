import { supabase } from "app/lib/supabase";
import { Cine } from "app/models/cines";
import { Funcion } from "app/models/funciones";
import { Pelicula } from "app/models/peliculas";

export const fetchCines = async (): Promise<Cine[]> => {
  const { data: cines, error } = await supabase.from("cines").select("*");
  if (error) throw new Error(error.message);
  return cines ? cines.map((cine) => ({ ...cine })) : [];
};

export const fetchCineById = async (id: string): Promise<Cine | null> => {
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
  return peliculas;
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
