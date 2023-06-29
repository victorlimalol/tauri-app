import { Routes, Route, useLocation } from 'react-router-dom';
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
import ContactForm from './pages/ContactForm/index';
import Home from './pages/Home/index';

function App() {
  const location = useLocation();
  
  return (
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Menu />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/digital-catalog" element={<DigitalCatalog />} />
        <Route path="/sachets" element={<SachetsPage />} />
        <Route path="/boxes" element={<BoxesPage />} />
        <Route path="/hangtags" element={<HangTagsPage />} />
        <Route path="/print" element={<PrintPage />} />
        <Route path="/ribbons" element={<RibbonsPage />} />
        <Route path="/sachets-standup" element={<SachetsStandup />} />
        <Route path="/sachets-aluminum" element={<SachetsAluminum />} />
        <Route path="/contact-form" element={<ContactForm />} />
      </Routes>
  );
}

export default App
