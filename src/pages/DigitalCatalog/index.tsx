import './styles.css';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const DigitalCatalog = () => {
  const [ backToMenu, setBackToMenu ] = useState<boolean>(false)
  const [ goToNextPage, setGoToNextPage ] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClickMenu = (route: string) => {
    setGoToNextPage(true)

    setTimeout(() => {
      navigate(route)
    }, 1000);
  };

  return (
    <div className='container-menu'>
      <div className='content-menu'>
        <Header startAnimationBack={setBackToMenu} />
        <div className='content-catalog'>
          <div className='box-catalog box-catalog-1'>
            <h3 className='subtitle'>RÓTULOS</h3>
          </div>
          <div className='box-catalog box-catalog-2'>
            <button className='item-button' onClick={() => handleClickMenu('/print')}>IMPRESSÃO TÉRMICA</button>
            <button className='item-button' onClick={() => handleClickMenu('/hangtags')}>ETIQUETAS INFORMATIVAS</button>
            <button className='item-button' >PRODUTOS ACABADOS</button>
          </div>
          <div className='box-catalog box-catalog-3'>
            <button className='item-button' onClick={() => handleClickMenu('/ribbons')}>RIBBONS</button>
          </div>
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

export default DigitalCatalog;