import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useRef, useState } from "react";
import Search from "../../components/Search/Search";
import { useSearchParams, useLocation, Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { moviesSearch } from "../../components/fetch-api";
import styles from "./MoviesPage.module.css";
import ErrorMassage from "../../components/ErrorMassage/ErrorMassage";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [params] = useSearchParams();
  const location = useLocation();
  const back = useRef(location.state ?? "/movies?query=${searchQuery}");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await moviesSearch(searchQuery);
        setMovies(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();
  }, [searchQuery]);

  const handleSubmit = async (query) => {
    setSearchQuery(query);
    params.set("query", query);
  };

  const handleGoBack = () => {
    setSearchQuery("");
  };

  return (
    <div>
      <Link
        to={back.current}
        className={styles.backLink}
        onClick={handleGoBack}
      >
        ⬅️Go back
      </Link>
      <Search onSubmit={handleSubmit} value={searchQuery} />
      <div>
        {isLoading && <Loader />}
        {error && <ErrorMassage />}
        {movies.length === 0 && !isLoading && !error && searchQuery && (
          <p>Search for the valid movie 😊 </p>
        )}
      </div>
      <MovieList movies={movies} />
    </div>
  );
}
