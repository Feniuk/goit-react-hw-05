import { fetchMovies } from "../../components/fetch-api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovieList() {
      try {
        setIsLoading(true);
        const trendingMovies = await fetchMovies();
        setMovies(trendingMovies);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovieList();
  }, []);
  return (
    <div className={styles.homePage}>
      {error && <p className={styles.error}>Something went wrong...</p>}
      <h1 className={styles.title}>Trending today:</h1>
      {isLoading ? (
        <div className={styles.loader}>LOADING...</div>
      ) : (
        <MovieList movies={[movies]} />
      )}
    </div>
  );
};

export default HomePage;
