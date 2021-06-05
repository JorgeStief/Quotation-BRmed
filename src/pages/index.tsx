import React from "react";
import { Graphic } from "../components/Graphic";
import format from 'date-fns/format';
import {ptBR} from 'date-fns/locale';

export default function Home(props) {
  return (
      <Graphic dates={props.dates}/>
  );

  
}

export async function getServerSideProps() {
    let categories = []
    let past = new Date()
    past.setDate(past.getDate() - 7)
    for(let i = 0; i<7; i++){
      await categories.push(format(past, 'dd/MM/yyyy', {locale: ptBR}))
      
      
      past.setDate(past.getDate() +1 )
    }

    return {
      props: {
        dates: categories
      }
    }
}