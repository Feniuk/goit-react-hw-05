import { getMovieCast } from "../fetch-api";
import styles from "./MovieCast.module.css";
import ErrorMassage from "../ErrorMassage/ErrorMassage";
import Loader from "../Loader/Loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function MovieCast() {
  const [actor, setActor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { moviesId } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const data = await getMovieCast(moviesId);
        setActor(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [moviesId]);

  return (
    <div className={styles.actorsContainer}>
      {isLoading && <Loader />}
      {error && <ErrorMassage />}
      <ul className={styles.actorsList}>
        {actor.map((actorItem) => {
          return (
            <li key={actorItem.id} className={styles.actorItem}>
              <img
                src={`https://image.tmdb.org/t/p/w500/${actorItem.profile_path}`}
                alt={actorItem.name}
                className={styles.actorImage}
              />
              <div className={styles.actorInfo}>
                <p className={styles.actorName}>Name: {actorItem.name}</p>
                <p className={styles.actorCharacter}>
                  Character: {actorItem.character}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
