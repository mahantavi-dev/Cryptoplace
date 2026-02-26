import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

  const { allCoin, currency, isLoading, error } = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])
  const [search, setSearch] = useState("")

  // Set coins when API loads
  useEffect(() => {
    if (Array.isArray(allCoin)) {
      setDisplayCoin(allCoin)
    }
  }, [allCoin])

  // Search handler
  const handleSearch = (e) => {
    e.preventDefault()

    const filtered = allCoin.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    )

    setDisplayCoin(filtered)
  }

  return (
    <div className='home'>

      {/* Hero Section */}
      <div className="hero">
        <h1>Largest <br /> Crypto Marketplace</h1>
        <p>
          Welcome to the world's largest cryptocurrency
          marketplace. Sign up to explore more about cryptos.
        </p>

        <form onSubmit={handleSearch}>
          <input
            type='text'
            placeholder='Search crypto...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type='submit'>Search</button>
        </form>
      </div>

      {/* Table */}
      <div className="crypto-table">

        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>

        {error && <p className='error-message'>{error}</p>}
        {isLoading && <p>Loading latest prices...</p>}

        {
          displayCoin
            .slice(0, 10)
            .map((item) => (

              <Link to={`/coin/${item.id}`} className="table-layout" key={item.id}>

                <p>{item.market_cap_rank}</p>

                <div className='coin-info'>
                  <img src={item.image} alt={item.name} width="25" />
                  <p>
                    {item.name} - {item.symbol.toUpperCase()}
                  </p>
                </div>

                <p>
                  {currency.symbol}
                  {item.current_price.toLocaleString()}
                </p>

                <p
                  style={{
                    textAlign: "center",
                    color: item.price_change_percentage_24h > 0
                      ? "green"
                      : "red"
                  }}
                >
                  {item.price_change_percentage_24h.toFixed(2)}%
                </p>

                <p className='market-cap'>
                  {currency.symbol}
                  {item.market_cap.toLocaleString()}
                </p>

              </Link>
            ))
        }

      </div>

    </div>
  )
}

export default Home
