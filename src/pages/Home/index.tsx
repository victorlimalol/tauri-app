import './styles.css';
import Lottie from "lottie-react";
import { useEffect } from "react";
// import valorize from "../../assets/valorize.json";

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

import valorize from "../../assets/lotties/valorize.json";
import personalize from "../../assets/lotties/personalize.json";
import anos from "../../assets/lotties/anos.json";
import destaque from "../../assets/lotties/destaque.json";
import sachesCaixas from "../../assets/lotties/sachesCaixas.json";
import suaFarmacia from "../../assets/lotties/farmacia.json";

import { syncDataToRemote } from '../../services/syncData';

export default function Home() {
  const [ goToNextPage, setGoToNextPage ] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClickHome = (route: string) => {
    setGoToNextPage(true)

    setTimeout(() => {
      navigate(route)
    }, 1000);
  };

  return (
    <div className='container-home-page'>
      <div className='home-group animations-top'>
        <Lottie
            animationData={valorize}
            aria-aria-labelledby='use lottie animation'
            className='animate inTop'
            loop
        />
        <Lottie
            animationData={sachesCaixas}
            aria-aria-labelledby='use lottie animation'
            className='animate inTop'
            loop
        />
      </div>
      <div className='home-group'>
        <Lottie
            animationData={destaque}
            aria-aria-labelledby='use lottie animation'
            className='animate'
            loop
        />
        <button className='button-home' onClick={() => handleClickHome('/menu')}>TOQUE PARA INICIAR</button>
        <div className='animate'/>
      </div>
      <div className='home-group animations-base'>
        <Lottie
            animationData={anos}
            aria-aria-labelledby='use lottie animation'
            className='animate'
            loop
        />
        <Lottie
            animationData={personalize}
            aria-aria-labelledby='use lottie animation'
            className='animate'
            loop
        />
        <Lottie
            animationData={suaFarmacia}
            aria-aria-labelledby='use lottie animation'
            className='animate'
            loop
        />
      </div>
      {goToNextPage && (
        <motion.div 
          className='transition-animated'
          initial={{ right: '-100%' }}
          animate={{ left: '0%' }}
          transition={{ 
            duration: 0.8
          }}  
        />
      )}
    </div>
  )
}