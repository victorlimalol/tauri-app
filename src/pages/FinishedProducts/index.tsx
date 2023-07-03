import './styles.css';
import finished from "../../assets/images/finished.png";
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import { useState } from 'react';

const FinishedProducts = () => {
  const [ backToMenu, setBackToMenu ] = useState<boolean>(false)

  return (
    <div className='container-menu'>
      <div className='content-menu'>
        <Header startAnimationBack={setBackToMenu} />
        <div className='content-finished'>
          <img src={finished} className='finishedImg'/>
        </div>
      </div>
      <motion.div 
        className='transition-animated'
        initial={{ right: '0%' }}
        animate={{ left: '-100%' }}
        exit={{ left: '0' }}
        transition={{ 
          duration: 0.5
        }}  
      />
      {backToMenu && (
        <motion.div 
        className='transition-animated'
        initial={{ left: '-100%' }}
        animate={{ left: '0%' }}
        exit={{ left: '0' }}
        transition={{ 
          duration: 0.5
        }}  
      />
      )}
    </div>
  );
};

export default FinishedProducts;