import React from "react";
import './FaceRecognition.css';

function FaceRecognition({URL, box}) {
    return(
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div style={{position: 'absolute', padding: '20px'}}>
          <img style={{color: 'white'}} id='inputImage' alt='Enter an image url and detect away!' src={URL} width='auto' height='auto'/>
          <div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
        </div>
      </div>
    )
}

export default FaceRecognition;