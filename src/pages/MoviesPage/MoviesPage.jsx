import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import Search from "../../components/Search/Search";
import { useSearchParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import { moviesSearch } from "../../components/fetch-api";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") ?? "";

  useEffect(() => {
    const pageApi = async () => {
      if (searchQuery && searchQuery.trim().length > 0) {
        try {
          setIsLoading(true);
          const trendingMovies = await moviesSearch(searchQuery);
          setMovies(trendingMovies.results);
        } catch (error) {
          setError(error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setMovies([]);
      }
    };
    pageApi();
  }, [searchQuery]);

  const formInput = (searchItem) => {
    if (!searchItem.trim()) {
      toast.error("Enter movie name");
      return;
    }
    setSearchParams({ query: searchItem });
  };

  const handleSubmit = async (query) => {
    searchParams.set("query", query);
  };

  return (
    <div>
      <Search searchQuery={searchQuery} onSetSearchQuery={formInput} />
      {isLoading && <Loader />}
      <ul>
        <MovieList movies={movies}></MovieList>
      </ul>
      <Toaster />
    </div>
  );
};

export default MoviesPage;
