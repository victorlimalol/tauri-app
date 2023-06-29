import './styles.css';
import ribbons from "../../assets/images/ribbons-page.png";
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import { useState } from 'react';

const RibbonsPage = () => {
  const [ backToMenu, setBackToMenu ] = useState<boolean>(false)

  return (
    <div className='container-menu'>
      <div className='content-menu'>
        <Header startAnimationBack={setBackToMenu} />
        <div className='content-ribbons'>
          <img src={ribbons} className='ribbonsImg'/>
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

export default RibbonsPage;