import React from 'react';
import Tilt from 'react-tilt';
import Brain from './brain.png';
import './Logo.css';

const Logo = () =>{
    return(
        <div className="ma3 mt0">
            <Tilt className="Tilt br3 shadow-2" options={{ max : 55 }} style={{ height: 100, width: 100 }} >
            <div className="Tilt-inner pa3"><img src={Brain} alt="logo"/></div>
            </Tilt>
        </div>
    );
}
export default Logo;