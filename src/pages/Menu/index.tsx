import './styles.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import Header from '../../components/Header';
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import video1 from "../../assets/video1.mp4"
import video2 from "../../assets/video2.mp4"
import MenuHeader from '../../components/MenuHeader';

const Menu = () => {
  const [ backToMenu, setBackToMenu ] = useState<boolean>(false)
  const [ videoIsRunning, setVideoIsRunning ] = useState<boolean>(false);
  const [ goToNextPage, setGoToNextPage ] = useState<boolean>(false);
  const [showAboutVideo, setShowAboutVideo] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoAboutRef = useRef<HTMLVideoElement>(null);

  const navigate = useNavigate();

  const handleClickMenu = (route: string) => {
    setGoToNextPage(true)

    setTimeout(() => {
      navigate(route)
    }, 1000);
  };

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnded);
      }
    };
  }, []);

  useEffect(() => {
    const videoElement = videoAboutRef.current;

    if (videoElement) {
      videoElement.addEventListener('ended', handleVideoEnded);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('ended', handleVideoEnded);
      }
    };
  }, []);

  const handleVideoEnded = () => {
    setVideoIsRunning(false)
  };

  const handleAboutButtonClick = () => {
    setShowAboutVideo(true);
  };

  return (
    <div className='container-menu'>
      <div className='content-menu-principal'>
        <MenuHeader />
        <div className='content-menu-options'>
          <div className='group-big-buttons-menu'>
            <button className='big-button-menu margin' onClick={() => handleClickMenu('/digital-catalog')}>CATÁLOGO <br></br>DIGITAL</button>
            <button className='big-button-menu' onClick={() => setShowAboutVideo(true)}>SOBRE A <br></br>TIME FORM</button>
          </div>
          <div className='group-small-buttons-menu'>
            <button className='small-button-menu margin' onClick={() => handleClickMenu('/sachets')}>SACHÊS</button>
            <button className='small-button-menu margin' onClick={() => handleClickMenu('/digital-catalog')}>RÓTULOS</button>
            <button className='small-button-menu margin' onClick={() => handleClickMenu('/boxes')}>CAIXAS</button>
            <button className='small-button-menu' onClick={() => setVideoIsRunning(true)}>LINHA <br></br> DIGITAL</button>
          </div>
          <div className='group-big-buttons-menu'>
            <button className='big-button-menu margin' onClick={() => handleClickMenu('/contact-form')}>RECEBER UM <br></br>ORÇAMENTO</button>
            <button className='big-button-menu' onClick={() => handleClickMenu('/satisfaction-survey')}>PESQUISA DE <br></br>SATISFAÇÃO</button>
          </div>
        </div>
      </div>
      {showAboutVideo && (
        <div className='container-video-executor'>
          <video ref={videoRef} onEnded={() => setShowAboutVideo(false)} className="video-container" src={video2} id="video" autoPlay></video>
        </div>
      )}
      {videoIsRunning && (
        <div className='container-video-executor'>
          <video ref={videoRef} onEnded={() => setVideoIsRunning(false)} className="video-container" src={video1} id="video" autoPlay></video>
        </div>
      )}
      <motion.div 
        className='transition-animated'
        initial={{ right: '0%' }}
        animate={{ left: '100%' }}
        transition={{ 
          duration: 0.8
        }}
      />
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
  );
};

export default Menu;