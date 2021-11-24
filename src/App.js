import { useEffect, useState } from "react";
import Movie from "./Movie";
function CoinTracker() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cash, setCash] = useState(0);
  const [coin, setCoin] = useState(0);
  const [exchange_value, setExchange_value] = useState(0);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const setSelectedCoin = (event) => {
    setCoin(event.target.value);
  };
  const putCash = (event) => {
    setCash(event.target.value);
  };
  const clickExchange = (event) => {
    event.preventDefault();
    setExchange_value(cash / coin);
  };
  return (
    <div>
      <h1>coin tracker {loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <select onChange={setSelectedCoin}>
            {coins.map((coin) => (
              <option value={coin.quotes.USD.price} key={coin.id}>
                {coin.name}({coin.symbol}):${coin.quotes.USD.price}
              </option>
            ))}
          </select>
          <input
            onChange={putCash}
            value={cash}
            placeholder="put your USD"
          ></input>
          <button onClick={clickExchange}>exchange</button>
          <h1>you can get {exchange_value}</h1>
        </div>
      )}
    </div>
  );
}

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
    <div>
      {loading ? (
        <h1>Loading now... </h1>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie
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

function App() {
  const [coin, setcoin] = useState(0);
  const coinclick = () => {
    setcoin(coin ? 0 : 1);
  };
  return (
    <div>
      <div>
        <button onClick={coinclick}>coin</button>
        {coin ? <CoinTracker /> : null}
      </div>
      <div>{<MovieShower />}</div>
    </div>
  );
}

export default App;
