import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div className={styles.notContainer}>
      <h1 className={styles.notTitle}>Page is Not Found</h1>
      <p className={styles.notText}>
        The page you are looking for does not exist.
      </p>
      <Link to="/" className={styles.notLink}>
        Go back to Home
      </Link>
    </div>
  );
}
