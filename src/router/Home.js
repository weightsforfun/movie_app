import { useEffect, useState } from "react";
import Movie from "../components/Movie";
import styles from "./Home.module.css";
import { CoinTracker } from "./Coin";

function MovieShower() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const fetchMovie = async () => {
    const response = await fetch(
      "https://yts.mx/api/v2/list_movies.json?minimum_rating=9&sort_by=year"
    );
    const json = await response.json();
    setMovies(json.data.movies);
    setLoading(false);
  };
  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <div className={styles.container}>
      {loading ? (
        <h1>Loading now... </h1>
      ) : (
        <div className={styles.movies}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              id={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}{" "}
        </div>
      )}
    </div>
  );
}

function Home() {
  const [theme, setTheme] = useState(1);
  const changeTheme = () => {
    setTheme(theme ? 0 : 1);
  };
  return (
    <div>
      <div>
        <button onClick={changeTheme}>{theme ? "coin" : "movie"}</button>
        {theme ? <MovieShower /> : <CoinTracker />}
      </div>
    </div>
  );
}

export default Home;
