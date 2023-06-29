import './styles.css';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import { useState } from 'react';

const SachetsPage = () => {
  const [ backToMenu, setBackToMenu ] = useState<boolean>(false)

  return (
    <div className='container-menu'>
      <div className='content-menu'>
        <Header startAnimationBack={setBackToMenu} />
        <div className='content-sachets'>
          <div className='box-sachets box-sachets-1'>
            <h3 className='subtitle'>SACHÊS</h3>
          </div>
          <div className='box-sachets box-sachets-2'>
            <button className='item-button-sachets'>ALUMINIZADO</button>
            <button className='item-button-sachets'>STAND-UP POUCH</button>
          </div>
          <div className='box-sachets box-sachets-3'></div>
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

export default SachetsPage;