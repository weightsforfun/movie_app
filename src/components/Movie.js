import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styles from "./Movie.module.css";
function Movie({ coverImg, title, summary, genres, id }) {
  return (
    <div className={styles.movie}>
      <img src={coverImg} alt={title} className={styles.movie__img} />
      <h2 className={styles.movie__title}>
        <Link to={`/movie/${id}`}>{title}</Link>
      </h2>
      <p className={styles.movie__summary}>
        {summary.length > 235 ? `${summary.slice(0, 235)}...` : summary}
      </p>
      <ul className={styles.movie__genres}>
        {genres.map((genre) => (
          <li key={genre}>{genre}</li>
        ))}
      </ul>
    </div>
  );
}
Movie.propTypes = {
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  id: PropTypes.number.isRequired,
};
export default Movie;
