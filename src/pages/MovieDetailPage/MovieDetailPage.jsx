import getMovieId from "../../components/fetch-api";
import { useState, useEffect } from "react";
import { Suspense } from "react";
import { useRef } from "react";
import styles from "./MovieDetailPage.module.css";
import {
  useParams,
  NavLink,
  Outlet,
  Link,
  useLocation,
} from "react-router-dom";

export default function MovieDetailPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const backLinkRef = useRef(location.state ?? "/");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovieId(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      }
    }

    fetchData();
  }, [movieId]);
  return (
    <div className={styles.detailContainer}>
      <Link to={backLinkRef.current} className={styles.backLink}>
        ⬅️Go back
      </Link>

      {movie && (
        <div className={styles.movieDetails}>
          <img
            src={
              movie.poster_path
                ? "https://image.tmdb.org/t/p/w300" + movie.poster_path
                : "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg"
            }
            width="350"
            alt={movie.title}
            className={styles.poster}
          />
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.userScore}>
            User Score: {Math.round(movie.vote_average * 10)}%
          </p>
          <h3 className={styles.overviewTitle}>Overview</h3>
          <p className={styles.overview}>{movie.overview}</p>
          <h3 className={styles.genresTitle}>Genres</h3>
          <div className={styles.genres}>
            {movie.genres.map((el) => el.name).join(", ")}
          </div>
        </div>
      )}

      <div className={styles.additionalInfo}>
        <h3 className={styles.infoTitle}>Additional information</h3>
        <ul className={styles.infoList}>
          <li>
            <NavLink to="cast" className={styles.infoLink}>
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink to="reviews" className={styles.infoLink}>
              Reviews
            </NavLink>
          </li>
        </ul>
      </div>

      <Suspense
        fallback={
          <div className={styles.loading}>LOADING SUB COMPONENT...</div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}
