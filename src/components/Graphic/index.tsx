import styles from  './styles.module.scss';
import Highcharts, { chart } from 'highcharts';
import { useEffect, useRef, useState } from 'react';
import format from 'date-fns/format';
import {ptBR} from 'date-fns/locale';

//SPA
//SSR -
//SSG
export interface iQuotation {
  date: string,
  base: string,
  rates: {
    EUR: number,
    JPY: number,
    BRL: number,
  }
}

export interface iSeries {
  name: string,
  data: Array<number>
}

export function Graphic(props) {
  const [symbols, setSymbols] = useState(['BRL', 'JPY', 'EUR']);
  const [symbolSelected, setSymbolSelected] = useState("BRL")
  const chartComponent = useRef(null);
  

  useEffect(() => {
     const chart = Highcharts.chart(chartComponent.current, {
      chart: {
        zoomType: 'x',
        type: 'line'
      },
      title: {
        text: `USD para ${symbolSelected}`
      },
      xAxis: [{
        categories: props.dates,
        crosshair: true,
      }],
      yAxis: {
          title: {
              text: 'taxa de câmbio'
          }
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {enabled:false}
          }
        }]
      },
      
      legend: {
        align: 'center',
        verticalAlign: 'top',
        layout: 'horizontal'
      },
      plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true
            }
        }
      },
    
      
    });
      
    
    chart.showLoading();
    handleEffect(chart)
    
  }, [symbolSelected]);

  const handleEffect = async (chart) => {
    let series = {
      name: symbolSelected,
      data: []
    }
    let past = new Date()
    past.setDate(past.getDate() - 7)
    for(let i = 0; i<7; i++){

      const pastDate = format(past, 'yyyy-MM-dd', {

        locale: ptBR
      })

      const response = await fetch(`https://api.vatcomply.com/rates?base=USD&date=${pastDate.toString()}&symbols=${symbolSelected}`)
      const data:iQuotation = await response.json()
      
      series.data.push(parseFloat(data.rates[symbolSelected].toFixed(3)))
      past.setDate(past.getDate() +1 )
    }
    
    chart.addSeries(series)
    chart.setSize(null);
    chart.hideLoading();
  }
  
  return(
    <div className={styles.footer}>

    <main className={styles.mainContainer}>
       <select  onChange={(e) => setSymbolSelected(e.target.value)} name="symbol" id="">
          {
            symbols.map((ob, i) => 
              <option key={i} value={ob}>{ob}</option>
            )
            
          }
        </select>
      <div ref={chartComponent} />

     
       
    </main>
    
      
    </div>
  );
}

