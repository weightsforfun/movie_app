import { useState, useEffect } from "react";

export function CoinTracker() {
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
