"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import Image from "next/image";

const featuredMovies = [
  {
    title: "Dune: Part Two",
    description:
      "Paul Atreides se une a los Fremen y emprende un camino de venganza contra los conspiradores que destruyeron a su familia.",
    imageUrl:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&w=2000",
    genre: "Sci-Fi",
  },
  {
    title: "Godzilla x Kong",
    description:
      "Dos titanes legendarios unen fuerzas para enfrentar una amenaza oculta que pone en peligro tanto su existencia como la nuestra.",
    imageUrl:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=2000",
    genre: "Acción",
  },
  {
    title: "Civil War",
    description:
      "En un futuro próximo, un equipo de periodistas viaja por Estados Unidos durante una escalada de conflicto civil.",
    imageUrl:
      "https://images.unsplash.com/photo-1547700055-b61cacebece9?auto=format&fit=crop&w=2000",
    genre: "Drama",
  },
];

const MovieCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredMovies.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredMovies.length) % featuredMovies.length
    );
  };

  return (
    <div className="relative h-[50vh] md:h-[70vh] overflow-hidden">
      {featuredMovies.map((movie, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
          <Image
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-full object-cover"
            layout="fill"
          />
          <div className="absolute inset-0 flex items-center z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-xl">
                <span className="inline-block px-3 py-1 bg-[#0C66DF] text-white text-sm rounded-full mb-4">
                  {movie.genre}
                </span>
                <h1 className="text-3xl md:text-5xl font-bold mb-2 md:mb-4 text-white">
                  {movie.title}
                </h1>
                <p className="text-base md:text-xl text-white mb-4 md:mb-8 line-clamp-2 md:line-clamp-none">
                  {movie.description}
                </p>
                <button className="bg-[#0C66DF] text-white px-6 md:px-8 py-2 md:py-3 rounded-full flex items-center space-x-2 hover:bg-[#0C66DF]/90 transition-colors">
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Ver Trailer</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 bg-[#0C66DF]/50 p-1.5 md:p-2 rounded-full hover:bg-[#0C66DF]/70 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 bg-[#0C66DF]/50 p-1.5 md:p-2 rounded-full hover:bg-[#0C66DF]/70 transition-colors"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {featuredMovies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide ? "bg-[#0C66DF]" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCarousel;
