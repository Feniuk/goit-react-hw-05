import { Link, useLocation } from "react-router-dom";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul>
      {movies.map((movie, index) => (
        <li key={index}>
          <Link
            to={{
              ...location,
              pathname: `/movies/${movie.id}`,
              state: location.state,
            }}
          >
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
