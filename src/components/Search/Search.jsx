import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import styles from "./Search.module.css";

export default function Search({ onSubmit }) {
  const [params, setParams] = useSearchParams();

  const onInputChange = (query) => {
    const newParams = new URLSearchParams(params);
    newParams.set("query", query);
    setParams(newParams);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryValue = e.target.query.value.trim();
    if (!queryValue) {
      toast.error("Enter a movie name");
      return;
    }

    onInputChange(queryValue);

    onSubmit(queryValue);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          className={styles.input}
          placeholder="Search movies"
          required
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
    </>
  );
}
