import './styles.css';
import Lottie from "lottie-react";
// import valorize from "../../assets/valorize.json";

import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const [ goToNextPage, setGoToNextPage ] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleClickMenu = (route: string) => {
    setGoToNextPage(true)

    setTimeout(() => {
      navigate(route)
    }, 1000);
  };

  return (
    <></>
  )
}