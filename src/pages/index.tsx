import React from "react";
import { Graphic } from "../components/Graphic";
import format from 'date-fns/format';
import {ptBR} from 'date-fns/locale';
export interface iQuotation {
  date: string,
  base: string,
  rates: {
    EUR: number,
    JPY: number,
    BRL: number,
  }
}

export default function Home(props) {
  return (
      <Graphic quotations={props.quotations} dates={props.dates}/>
  );

  
}

export async function getServerSideProps(){
  let quotations = []
  let dates = []
  let series1 = {
    name: 'BRL',
    data: []
  }
  let series2 = {
    name: 'EUR',
    data: []
  }
  let series3 = {
    name: 'JPY',
    data: []
  }
  let past = new Date()
  past.setDate(past.getDate() - 6)
  for(let i = -1; i<6; i++){

    const pastDate = format(past, 'yyyy-MM-dd', {

      locale: ptBR
    })

    const response = await fetch(`https://api.vatcomply.com/rates?base=USD&date=${pastDate.toString()}`)
    const data:iQuotation = await response.json()
    
    series1.data.push(parseFloat(data.rates.BRL.toFixed(2)))
    series2.data.push(parseFloat(data.rates.EUR.toFixed(2)))
    series3.data.push(parseFloat(data.rates.JPY.toFixed(2)))

    dates.push(format(past, 'dd/MM/yyyy', {locale: ptBR}))
    past.setDate(past.getDate() + 1)
  }
  quotations.push(series1)
  quotations.push(series2)
  quotations.push(series3)
  

    return { 
      props: {
        quotations: quotations,
        dates: dates,
      }
    }
}
