import { Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation/Navigation";
import { Suspense, lazy } from "react";
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailPage = lazy(() =>
  import("./pages/MovieDetailPage/MovieDetailPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFound"));
const MovieCast = lazy(() => import("./components/MovieCast/MovieCast"));
const MovieReview = lazy(() => import("./components/MovieReview/MovieReview"));

function App() {
  return (
    <>
      <div>
        <Navigation />
        <Suspense fallback={<div>...LOADING PAGE...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReview />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;
