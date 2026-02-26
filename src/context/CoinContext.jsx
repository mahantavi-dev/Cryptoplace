import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props)=>{

    const[allCoin, setAllCoin] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const[currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })   

    const fetchAllCoin = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch coins (${response.status})`);
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Coin API returned an unexpected payload.");
        }

        setAllCoin(data);
      } catch (err) {
        setAllCoin([]);
        setError(err.message || "Unable to load coin data.");
      } finally {
        setIsLoading(false);
      }
    };

useEffect(()=>{
fetchAllCoin();
},[currency])

const contextValue = {

    allCoin, currency, setCurrency, isLoading, error

}

    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;
