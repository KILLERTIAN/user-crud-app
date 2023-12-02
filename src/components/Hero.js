import React from 'react';
import './Hero.css';
import Typed from 'react-typed';
import { Link } from 'react-router-dom';
// import Spline from '@splinetool/react-spline';

function Hero() {
  return (
    <div className='heroContainer'>
    <div className="textContainer">
    <h1>
                    <Typed
                        strings={[
                            'Create',
                            'Update',
                            'Delete']}
                        typeSpeed={150}
                        backSpeed={100}
                        loop >
                    </Typed>
                    <span className='spanuser'> Users </span>
                     
                </h1>

                <button className="userButton"><Link to='/users' className="userButtonLink">Get Started</Link>
                </button>
                
    </div>
    <div className="animationContainer">
    
    {/* <Spline scene="https://prod.spline.design/ig1sfK4aIL7WEKIV/scene.splinecode" /> */}
    
    </div>
    </div>
  )
}

export default Hero