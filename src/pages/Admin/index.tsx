import './styles.css';
import { useEffect } from "react";
import boxes from "../../assets/images/boxes-page.png";
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import { useState } from 'react';
import AdminHeader from '../../components/AdminHeader';
import { exportToCSV } from '../../utils/indexedDBExport';
import { syncDataToRemote } from '../../services/syncData';

const AdminPage = () => {
  const [ backToMenu, setBackToMenu ] = useState<boolean>(false);



  return (
    <div className='container-menu'>
      <div className='content-menu'>
        <AdminHeader startAnimationBack={setBackToMenu} />
        <div className='content-boxes'>
          <button onClick={() => syncDataToRemote()}>Sincronize</button>
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

export default AdminPage;