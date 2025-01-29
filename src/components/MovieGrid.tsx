"use client";

import React from "react";
import MovieCard from "./MovieCard";
import { useTheme } from "../context/ThemeContext";

const movies = [
  {
    title: "Dune: Part Two",
    imageUrl:
      "https://images.unsplash.com/photo-1534809027769-b00d750a6bac?auto=format&fit=crop&w=800",
    rating: 8.5,
    duration: "2h 46min",
    genre: "Sci-Fi",
    isPremiere: true,
  },
  {
    title: "Kung Fu Panda 4",
    imageUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800",
    rating: 7.8,
    duration: "1h 34min",
    genre: "Animación",
    isPremiere: true,
  },
  {
    title: "Ghostbusters: Frozen Empire",
    imageUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800",
    rating: 7.2,
    duration: "2h 15min",
    genre: "Aventura",
  },
  {
    title: "Godzilla x Kong",
    imageUrl:
      "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800",
    rating: 8.0,
    duration: "2h 25min",
    genre: "Acción",
  },
  {
    title: "Civil War",
    imageUrl:
      "https://images.unsplash.com/photo-1547700055-b61cacebece9?auto=format&fit=crop&w=800",
    rating: 7.9,
    duration: "2h 09min",
    genre: "Drama",
  },
  {
    title: "Mickey 17",
    imageUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800",
    rating: 7.5,
    duration: "2h 20min",
    genre: "Sci-Fi",
  },
];

const MovieGrid = () => {
  const { theme } = useTheme();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <h2
        className={`text-2xl md:text-3xl font-bold mb-6 md:mb-8 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        En Cartelera
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6">
        {movies.map((movie, index) => (
          <MovieCard key={index} {...movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
