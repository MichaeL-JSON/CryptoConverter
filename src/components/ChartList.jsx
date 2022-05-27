import React from 'react';
import LineChart from './LineChart';

const ChartList = ({days, currency, coinsCharts}) => {
    
    if(!coinsCharts.length){
        return <h1 style={{textAlign: 'center'}}>
                    Графики не найдены
                </h1>
    }

    return (
        <div style={{width: '420px', margin: '0 auto'}}>
             {
              coinsCharts.map(data => 
              <LineChart 
              key={data.id} 
              id={data.id} 
              historicData={data.body} 
              days={days}  
              currency={currency} 
              />)
              }
        </div>
    );
};

export default ChartList;