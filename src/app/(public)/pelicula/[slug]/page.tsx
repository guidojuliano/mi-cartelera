import { RightSection } from "app/components/RightSection";
import MovieDetail from "app/components/MovieDetail";

const CinePage = () => {
  return (
    <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <>
          <MovieDetail />
          <RightSection />
        </>
      </div>
    </div>
  );
};

export default CinePage;
