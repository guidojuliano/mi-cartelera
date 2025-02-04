export const getPosterUrl = (
  poster: string | null | undefined,
  poster_url: string | null | undefined
) => {
  // Si hay una URL de Supabase, úsala
  if (poster_url) {
    return poster_url;
  }

  // Si hay una ruta local, constrúyela correctamente
  if (poster) {
    // Asegúrate de que la ruta no comience con "/"
    const cleanedPosterPath = poster.startsWith("/") ? poster.slice(1) : poster;
    return `/assets/${cleanedPosterPath}`;
  }

  // Si no hay ninguna imagen, usa una por defecto
  return "/assets/images/peliculas/poster/genericPoster.jpg";
};
