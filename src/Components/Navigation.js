import React from "react";
import '../App.css';
import github from '../images/github.svg'

function Navigation({onRouteChange, isSignedIn}) {
    if (isSignedIn) {
        return(
            <nav>
                <a href="https://github.com/liam2258/FaceRecognition"><img src={github} alt='Face-Detection' width={'40px'} height={'40px'} padding={'13px'}></img></a>
                <div style={{display: 'flex', padding: '10px'}}>
                    <button onClick={() => onRouteChange('signout')}>Sign Out</button>
                </div>
            </nav>
        )
    } else {
        return(
            <nav>
                <a href="https://github.com/liam2258/FaceRecognition"><img src={github} alt='Face-Detection' width={'40px'} height={'40px'} padding={'13px'}></img></a>
                <div style={{display: 'flex', gap: '10px', padding: '10px'}}>
                    <button style={{cursor: 'pointer'}} onClick={() => onRouteChange('signin')}>Sign In</button>
                    <button style={{cursor: 'pointer'}} onClick={() => onRouteChange('register')}>Register</button>
                </div>
            </nav>
        )
    }
}

export default Navigation;