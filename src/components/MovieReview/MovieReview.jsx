import { fetchMovieReviews } from "../fetch-api";
import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import ErrorMassage from "../ErrorMassage/ErrorMassage";
import styles from "./MovieReview.module.css";
import useParams from "react-router-dom";

export default function MovieReview() {
  const { movieId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchDataReviews() {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchDataReviews();
  }, [movieId]);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className={styles.reviewsContainer}>
      <h3>Movie Reviews</h3>
      {setLoading && <Loader />}
      {error && <ErrorMassage />}
      {reviews.length > 0 && (
        <ul className={styles.reviewsList}>
          {reviews.map(({ id, author, content }) => (
            <li key={id} className={styles.reviewItem}>
              <h3 className={styles.author}>{author}</h3>
              <p className={styles.content}>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {!reviews && <p>No reviews available yet🙃</p>}
    </div>
  );
}
