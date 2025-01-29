import MovieCarousel from "../components/MovieCarousel";
import MovieGrid from "../components/MovieGrid";
import MovieGridProximas from "app/components/MovieGridProximas";
import CardLinksFrecuentes from "app/components/CardLinksFrecuentes";
import { CinesContainer } from "app/components/CinesCointainer";

function App() {
  return (
    <div className="text-gray-800 dark:text-white">
      <main>
        <MovieCarousel />
        <div className="relative">
          <MovieGrid />
          <MovieGridProximas />
          <CardLinksFrecuentes />
          <CinesContainer />
        </div>
      </main>
    </div>
  );
}

export default App;
