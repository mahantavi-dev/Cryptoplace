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
    const apiKey = (import.meta.env.VITE_COINGECKO_API_KEY || "cf4680fecb044b24ade4118ac68f094a")
      .replace(/\\n/g, "")
      .trim();

    const fetchAllCoin = async () => {
      setIsLoading(true);
      setError("");

      const requestWithOptionalKey = async ({ includeKey, page }) => {
        const requestUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}&order=market_cap_desc&per_page=250&page=${page}&sparkline=false`;

        const response = await fetch(requestUrl, {
          method: "GET",
          headers: includeKey
            ? {
                accept: "application/json",
                "x-cg-demo-api-key": apiKey,
              }
            : {
                accept: "application/json",
              },
        });

        return response;
      };

      try {
        const maxPages = 4;
        const allCoinsFromPages = [];

        for (let page = 1; page <= maxPages; page += 1) {
          let response = await requestWithOptionalKey({ includeKey: Boolean(apiKey), page });

          // If key-based request is rejected, retry once without key.
          if ((response.status === 401 || response.status === 403) && apiKey) {
            response = await requestWithOptionalKey({ includeKey: false, page });
          }

          if (!response.ok) {
            throw new Error(`Failed to fetch coins (${response.status})`);
          }

          const pageData = await response.json();

          if (!Array.isArray(pageData)) {
            throw new Error("Coin API returned an unexpected payload.");
          }

          allCoinsFromPages.push(...pageData);

          // Stop early when API has no more data.
          if (pageData.length < 250) {
            break;
          }
        }

        setAllCoin(allCoinsFromPages);
      } catch (err) {
        setError(err.message || "Unable to load coin data. Please verify your API key and rate limit.");
        setAllCoin([]);
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
