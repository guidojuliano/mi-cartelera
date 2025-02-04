import { Star, Clock } from "lucide-react";
import Image from "next/image";
import parseDuracion from "app/utils/formatDuration";
import { getPosterUrl } from "app/utils/getPosterUrl";

interface MovieCardProps {
  title: string;
  poster: string | null | undefined;
  poster_url: string | null | undefined;
  rating?: string | undefined;
  duration?: string | undefined;
  genre?: string | undefined;
  isPremiere?: boolean;
}

const MovieCard = ({
  title,
  poster,
  poster_url,
  rating,
  duration,
  genre,
  isPremiere,
}: MovieCardProps) => {
  const posterUrl = getPosterUrl(poster, poster_url);
  return (
    <div className="group relative overflow-hidden rounded-xl">
      <div className="aspect-[2/3] overflow-hidden">
        <Image
          src={posterUrl}
          alt={title}
          layout="fill"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {isPremiere && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-sm opacity-50"></div>
              <div className="relative bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-lg text-xs font-medium border border-white/10 shadow-xl backdrop-blur-sm">
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white animate-ping"></div>
                <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-white"></div>
                ESTRENO
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 p-4 w-full">
          <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
          <div className="flex items-center space-x-4 text-sm text-white">
            {rating && (
              <div className="flex items-center">
                <Star className="w-4 h-4 text-[#0C66DF] dark:text-white mr-1" />
                <span>{rating}</span>
              </div>
            )}
            {duration && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-[#0C66DF] dark:text-white mr-1" />
                <span>{parseDuracion(duration)}</span>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {genre?.split(/,\s*/).map((genero, index) => (
              <span
                key={`${genero}-${index}`} // Usar combinación de género + índice como clave
                className="inline-block px-2 py-1 bg-[#0C66DF] text-white text-xs rounded-full"
              >
                {genero.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
