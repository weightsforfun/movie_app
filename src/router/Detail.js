import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function Detail() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [isloading, setIsloading] = useState(true);
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setIsloading(false);
    console.log(json.data.movie);
  };
  useEffect(() => {
    getMovie();
  }, []);

  return isloading ? (
    <h1>is loading...</h1>
  ) : (
    <div>
      <h1>{movie.title}</h1>
      <img src={`${movie.medium_cover_image}`}></img>
      <h2>{movie.description_full}</h2>
    </div>
  );
}
export default Detail;
