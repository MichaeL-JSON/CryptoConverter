import React, { useEffect, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';
import { SingleCoin } from '../Api/CoinService';


const Converter = () => {

    const [fromCurrency, setFromCurrency] = useState('bitcoin')
    const [toCurrency, setToCurrency] = useState('usd')
    const [exchangeRate, setExchangeRate] = useState(1)
    const [amount, setAmount] = useState(1)
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
    

    let toAmount, fromAmount
    if (amountInFromCurrency) {
        fromAmount = amount
        toAmount = amount * exchangeRate
    } else {
        toAmount = amount
        fromAmount = amount / exchangeRate
    }

    function handleFromAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(true)
        }
    
    function handleToAmountChange(e) {
        setAmount(e.target.value)
        setAmountInFromCurrency(false)
        }

    const handleChangePrimary =  (event) => {
        setFromCurrency(event.target.value);
    }

    const handleChangeSecondary = (event) => {
        setToCurrency(event.target.value);
    }

    async function fetchData(){
        const { data } = await axios.get(SingleCoin(fromCurrency));
        const tickers = data.market_data.current_price;
        for (let key in tickers){
            if(key == toCurrency){
                setExchangeRate(tickers[key])
            }
        }
        
    }
    

    useEffect( () => {
         fetchData()   
      }, [fromCurrency,toCurrency])

    return (
        <div className='main'>
            <div className='cur_selects'>
                <FormControl sx={{ m: 1, minWidth: 60, width: '50%' }} style={{color: '#1239b3'}}>
                    <InputLabel 
                        id="demo-simple-select-autowidth-label" 
                        style={{color:'rgb(25 118 210)'}}>
                            in
                    </InputLabel>

                    <Select
                    style={{color: 'rgb(25 118 210)'}}
                    labelId="simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={fromCurrency}
                    onChange={handleChangePrimary}
                    autoWidth
                    label="in"
                    >
                        <MenuItem style={{color: 'rgb(22 74 131)'}} value={'usd-coin'}>USD</MenuItem>
                        <MenuItem style={{color: 'rgb(22 74 131)'}} value={'bitcoin'}>BTC</MenuItem>
                        <MenuItem style={{color: 'rgb(22 74 131)'}} value={'ethereum'}>ETH</MenuItem>
                    </Select>
                </FormControl>

                <FormControl sx={{ m: 1, minWidth: 60, width: '50%' }} style={{color: '#1239b3'}}>
                    <InputLabel 
                    id="demo-simple-select-autowidth-label" 
                    style={{color:'rgb(25 118 210)'}}>
                        to
                    </InputLabel>

                    <Select
                    style={{color: 'rgb(25 118 210)'}}
                    labelId="simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={toCurrency}
                    onChange={handleChangeSecondary}
                    autoWidth
                    label="to"
                    >
                        <MenuItem style={{color: 'rgb(22 74 131)'}} value={'usd'}>USD</MenuItem>
                        <MenuItem style={{color: 'rgb(22 74 131)'}} value={'btc'}>BTC</MenuItem>
                        <MenuItem style={{color: 'rgb(22 74 131)'}} value={'eth'}>ETH</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className='cur_inputs'>
                <input type="number"  value={fromAmount} onChange={handleFromAmountChange}/>
                <input type="number"  value={toAmount} onChange={handleToAmountChange}/>
            </div>
        </div>
    );
};

export default Converter;

// onKeyDown={(e) =>["e", "E", "+", "-"].includes(e.key) && e.preventDefault()}