import React from 'react';
import Footer from '../components/Footer';
import { Header } from '../components/Header';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header/>
      <Component {...pageProps} />
      <Footer/>
    </div>
  );
}

export default MyApp;
