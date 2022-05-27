import { Button, FormControl, InputLabel, MenuItem, Select, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import { SingleCoin } from '../Api/CoinService';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import MyInput from '../components/input/MyInput';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';

const Portfolio = () => {

    ChartJS.register(ArcElement, Tooltip, Legend);


    const [currency, setCurrency] = useState('usd-coin');
    const [portfolioStore, setPortfolioStore] = useState([
        {id: 'bitcoin', price:30000},
        {id: 'usd-coin', price:3000},
        {id: 'ethereum', price:2000}]);
    const [actionMode, setActionMode] = useState('buy');
    const [exchangeRate, setExchangeRate] = useState(1);
    const primaryCurrency = 'usd';
    const [summ, setSumm] = useState(777);
    const [valuation, setValuation] = useState('');

    let data = {
        labels: portfolioStore.map((ticker) => ticker.id.toUpperCase()),
        datasets: [
            {
            data: portfolioStore.map((ticker) => ticker.price),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            },
        ],
        };

    function getPortfolioValuation(){
        const res = portfolioStore.reduce((acc,obj) => acc + obj.price,0);
        setValuation(res.toFixed(0))
    }

    function setOfferMethod(object){
        if(actionMode == 'buy'){
            if(object.id == currency ){
                return {...object, price: object.price + summ * exchangeRate};
            }else{
                return object;
            }
        }else{
            if(object.id == currency){
                return {...object, price: object.price - summ * exchangeRate};
            }else{
                return object;
            }
        }
    }


    function makeOffer() { 
        setPortfolioStore(portfolioStore.map(obj => setOfferMethod(obj)));
    }

    const handleChangeAction = (event, newMode) => {
        if (newMode !== null) {
            setActionMode(newMode);
        }
    };

    const handleChangeCurrency = (event) => {
        setCurrency(event.target.value);
    };

    async function fetchData(){
        const { data } = await axios.get(SingleCoin(currency));
        const tickers = data.market_data.current_price;
        for (let key in tickers){
            if(key == primaryCurrency){
                setExchangeRate(tickers[key])
            }
        }
    }  

    useEffect(() => {
        fetchData();
    },[currency])

    useEffect(() => {
        getPortfolioValuation();
    },[portfolioStore])


    return (
        <Container maxWidth="md" style={{display:'flex', flexWrap:'nowrap'}}>
            <div className='portfolio'>

                <div className='portfolio__valuation'>
                    <h1>Your valuation is:</h1>
                    <div style={{background: 'rgb(24 78 141 / 28%)',borderRadius: '5px',padding: '0 15px'}}>
                        <h1>{valuation}$</h1>
                    </div>
                </div>
                <hr className='hr__line'/>
                <div className='portfolio__select'>
                    <FormControl sx={{ m: 1, minWidth: 60 }} style={{color: '#1239b3',width: '50%', display: 'flex'}}>
                        <InputLabel 
                            id="demo-simple-select-autowidth-label" 
                            style={{color:'rgb(25 118 210)'}}>
                                in
                        </InputLabel>

                        <Select
                            style={{color: 'rgb(25 118 210)'}}
                            labelId="simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={currency}
                            onChange={handleChangeCurrency}
                            autoWidth
                            label="in"
                            >
                                <MenuItem style={{color: 'rgb(22 74 131)'}} value={'usd-coin'}>USD</MenuItem>
                                <MenuItem style={{color: 'rgb(22 74 131)'}} value={'bitcoin'}>BTC</MenuItem>
                                <MenuItem style={{color: 'rgb(22 74 131)'}} value={'ethereum'}>ETH</MenuItem>
                        </Select>
                    </FormControl>

                    <ToggleButtonGroup
                        style={{width: '50%',margin: '8px', height: '57px'}}
                        orientation="vertical"
                        color="primary"
                        value={actionMode}
                        exclusive
                        onChange={handleChangeAction}
                        >
                        <ToggleButton value="buy" style={{height:'50%'}}>
                            Buy
                        </ToggleButton>
                        <ToggleButton value="sell" style={{height:'50%'}}>
                            Sell
                        </ToggleButton>
                    </ToggleButtonGroup>
                </div>

                <div className='portfolio__submit'>
                    <MyInput 
                    type='number' 
                    value={summ}
                    onChange={e => setSumm(e.target.value)}
                    />
                    <Button variant="outlined" style={{minWidth: '30px'}} onClick={makeOffer} >
                        <ArrowForwardIosSharpIcon/>
                    </Button>
                </div>
            </div>

            <div className='portfolio__diagram'>
                <Doughnut data={data} />
            </div>
        </Container>
    );
};

export default Portfolio;