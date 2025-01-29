import { Star, Clock } from "lucide-react";
import Image from "next/image";

interface MovieCardProps {
  title: string;
  imageUrl: string;
  rating: number;
  duration: string;
  genre: string;
  isPremiere?: boolean;
}

const MovieCard = ({
  title,
  imageUrl,
  rating,
  duration,
  genre,
  isPremiere,
}: MovieCardProps) => {
  return (
    <div className="group relative overflow-hidden rounded-xl">
      <div className="aspect-[2/3] overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {isPremiere && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500 blur-sm opacity-50"></div>
              <div className="relative bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 rounded-lg text-sm font-medium border border-white/10 shadow-xl backdrop-blur-sm">
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
            <div className="flex items-center">
              <Star className="w-4 h-4 text-[#0C66DF] dark:text-white mr-1" />
              <span>{rating}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 text-[#0C66DF] dark:text-white mr-1" />
              <span>{duration}</span>
            </div>
          </div>
          <span className="inline-block mt-2 px-2 py-1 bg-[#0C66DF] text-white text-xs rounded-full">
            {genre}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
