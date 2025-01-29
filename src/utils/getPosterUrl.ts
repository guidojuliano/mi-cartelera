export const getPosterUrl = (
  poster: string | null,
  poster_url: string | null
) => {
  if (poster_url) {
    return poster_url; // Usa la URL de Supabase si existe
  }
  if (poster) {
    return `/assets/${poster}`; // Usa la imagen local si existe
  }
  return "/assets/images/peliculas/poster/genericPoster.jpg"; // Imagen por defecto
};
