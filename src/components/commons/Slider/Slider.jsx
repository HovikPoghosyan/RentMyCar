import React, { useRef } from 'react';

import classNames from 'classnames';

import AliceCarousel from 'react-alice-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
   faAngleLeft,
   faAngleRight,
} from '@fortawesome/free-solid-svg-icons';

import Button from '../Button/Button';

import styles from './Slider.module.scss';
import './Carousel.css';
import 'react-alice-carousel/lib/scss/alice-carousel.scss';

function Slider({ imagesList }) {
  const carouselRef = useRef(null);
  

   return (
      <AliceCarousel 
         items = { imagesList.map(( url ) => <img className = { styles.mainImg } src = { url } /> ) }
         mouseTracking
         infinite
         renderPrevButton = { ({ isDisabled }) => <Button style = { classNames( styles.sliderBtn, styles.prevBtn ) } name = { <FontAwesomeIcon icon = { faAngleLeft } isDisabled = { isDisabled } /> } /> }
         renderNextButton = { ({ isDisabled }) => <Button style = { classNames( styles.sliderBtn, styles.nextBtn ) } name = { <FontAwesomeIcon icon = { faAngleRight } isDisabled = { isDisabled } /> } /> }
         renderDotsItem = { ({ isActive, activeIndex }) => 
            <img
               src = { imagesList[ activeIndex ] }
               className = { classNames( styles.dots, { [ styles.dotsActive ] : isActive }) }
               alt = { `Dot No${activeIndex}` }
            />
         }
      />
   )
}

export default Slider