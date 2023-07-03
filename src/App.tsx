import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HotKeys } from 'react-hotkeys';
import './App.css'

import BoxesPage from './pages/BoxesPage/index'
import HangTagsPage from './pages/HangTagsPage/index'
import DigitalCatalog from './pages/DigitalCatalog/index'
import PrintPage from './pages/PrintPage/index'
import RibbonsPage from './pages/RibbonsPage/index'
import SachetsAluminum from './pages/SachetsAluminium/index'
import SachetsPage from './pages/SachetsPage/index'
import SachetsStandup from './pages/SachetsStandUp/index'
import Menu from './pages/Menu/index'
import FinishedProducts from './pages/FinishedProducts';
import ContactForm from './pages/ContactForm/index';
import Home from './pages/Home/index';
import { ToastContainer } from 'react-toastify';
import SatisfactionSurvey from './pages/SatisfactionSurvey';
import { useEffect } from 'react';
import AdminPage from './pages/Admin';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handlers = {
    HANDLE_SHORTCUT_1: () => {
      navigate('/admin');
    },
  };

  useEffect(() => {
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.altKey && e.shiftKey && e.code === 'KeyE') {
        handlers.HANDLE_SHORTCUT_1();
      }
    });
  }, []);

  return (
      <>
        <ToastContainer />
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/home" element={<Home />} />
          <Route path="/digital-catalog" element={<DigitalCatalog />} />
          <Route path="/sachets" element={<SachetsPage />} />
          <Route path="/boxes" element={<BoxesPage />} />
          <Route path="/hangtags" element={<HangTagsPage />} />
          <Route path="/print" element={<PrintPage />} />
          <Route path="/ribbons" element={<RibbonsPage />} />
          <Route path="/sachets-standup" element={<SachetsStandup />} />
          <Route path="/sachets-aluminum" element={<SachetsAluminum />} />
          <Route path="/contact-form" element={<ContactForm />} />
          <Route path="/satisfaction-survey" element={<SatisfactionSurvey />}/>
          <Route path="/finished-products" element={<FinishedProducts />}/>
          <Route path="/admin" element={<AdminPage />}/>
        </Routes>
        <HotKeys />
      </>
  );
}

export default App
