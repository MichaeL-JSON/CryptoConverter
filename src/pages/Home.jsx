import { Button } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { HistoricalChart } from '../Api/CoinService';
import ChartList from '../components/ChartList';
import Converter from '../components/Converter';
import Container from '@mui/material/Container';




const Home = () => {

  const allcoins = ['bitcoin', 'ethereum', 'usd-coin'] 
  const [days, setDays] = useState(14)
  const [currency, setCurrency] = useState('usd')
  const [coinsCharts, setCoinsCharts] = useState([])

  async function fetchAllCoins() {
    allcoins.forEach( async (coin) => {
    const chart  = await axios.get(HistoricalChart(coin,days, currency));
    setCoinsCharts(last => [...last, {id: coin, body: chart.data.prices}])
    })
  }

  useEffect(() => {
     fetchAllCoins();
  }, []);

 
    return (
        <Container maxWidth="md">
          <h1 className='header__center'>
            <strong>Crypto Converter</strong>
          </h1>
          <Converter/>
          <ChartList coinsCharts={coinsCharts} days={days} currency={currency}/>
        </Container>
    );
};

export default Home;