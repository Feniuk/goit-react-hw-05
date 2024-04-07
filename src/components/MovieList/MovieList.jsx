import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.listMovie}>
          <Link
            to={{
              location,
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
