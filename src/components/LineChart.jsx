  import React from 'react';
  import {Line } from 'react-chartjs-2';
  import {Chart as ChartJS} from 'chart.js/auto'
  const LineChart = (props) => {


      const {id, historicData, days, currency} = props
      return (
          <div>
              <h3>{id.toUpperCase()}</h3>
              <Line 
          style={{marginTop: '20px'}}
          data={{
              labels: historicData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),
              datasets: [
                {
                  data: historicData.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days ) in ${currency}`,
                  borderColor: "#1776c8",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}/>
          </div>
      );
  };

export default LineChart;