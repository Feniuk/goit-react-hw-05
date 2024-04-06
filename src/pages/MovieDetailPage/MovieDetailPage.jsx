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
  const { moviesId } = useParams();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const backLinkRef = useRef(location.state ?? "/");
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMovieId(moviesId);
        setMovie(data);
      } catch (error) {
        setError(true);
      }
    }

    fetchData();
  }, [moviesId]);
  return (
    <div>
      <Link to={backLinkRef.current} className={styles.backLink}>
        ⬅️Go back
      </Link>
    </div>
  );
}
