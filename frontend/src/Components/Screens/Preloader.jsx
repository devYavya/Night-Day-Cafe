import React, { useEffect } from 'react'
import {preLoaderAnim} from '../../Animation';
import '../Styles/Preloader.css'
const Preloader = () => {

    useEffect(() => {
        preLoaderAnim();
      }, []);
  return (
    <div className='preloader'>
    <div className='texts-container'>
    <span><img className='img' src="./logopre.png"alt='Preloader'/></span>
    </div>
    </div>
  )
}

export default Preloader