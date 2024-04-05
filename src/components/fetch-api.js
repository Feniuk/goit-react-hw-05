import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";

const options = {
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2U0MDRjMTA4N2E5YWYyYThiZWQ5MjM4OWEwMGZiYSIsInN1YiI6IjY2MGQ4NWIxMzU4MThmMDE3YzNjNTc4NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.U-vt6niv9qRZipTbYT29yxY-GL5kLbNteA3c-1tUq2w",
  },
};
export async function fetchMovies() {
  const { data } = await axios.get("/trending/movie/day", options);
  return data.results;
}
