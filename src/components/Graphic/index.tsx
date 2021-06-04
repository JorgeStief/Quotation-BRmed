import styles from  './styles.module.scss';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
export function Graphic(props) {
  console.log(props.quotations)
  const options = {
    chart: {
      zoomType: 'x',
      type: 'line'
    },
    title: {
      text: 'USD para BRL, Yene e Euro'
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
    series:  props.quotations,
  
    
  };
  
  return(
    <main className={styles.mainContainer}>

      <HighchartsReact  highcharts={Highcharts} options={options} />
    </main>
      
    
  );
}

