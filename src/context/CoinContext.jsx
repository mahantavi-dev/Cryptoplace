import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props)=>{

    const[allCoin, setAllCoin] = useState([]);
    const[currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })   

    const fetchAllCoin = async () => {

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-91Na3gF37jLkMimFB9B4FtwP'
    }
  };

  fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setAllCoin(data);   // important: store data in state
    })
    .catch(err => console.error(err));
};

useEffect(()=>{
fetchAllCoin();
},[])

const contextValue = {

    allCoin, currency, setCurrency

}

    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;