import React from "react";
import '../App.css';

function Navigation({onRouteChange, isSignedIn}) {
    if (isSignedIn) {
        return(
            <nav>
                <img src={require('../images/github2.png')} alt='Face-Detection' width={'40px'} height={'40px'}></img>
                <div style={{display: 'flex', padding: '10px'}}>
                    <button onClick={() => onRouteChange('signout')}>Sign Out</button>
                </div>
            </nav>
        )
    } else {
        return(
            <nav>
                <img src={require('../images/github2.png')} alt='Face-Detection' width={'40px'} height={'40px'}></img>
                <div style={{display: 'flex', gap: '10px', padding: '10px'}}>
                    <button style={{cursor: 'pointer'}} onClick={() => onRouteChange('signin')}>Sign In</button>
                    <button style={{cursor: 'pointer'}} onClick={() => onRouteChange('register')}>Register</button>
                </div>
            </nav>
        )
    }
}

export default Navigation;