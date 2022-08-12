import React from "react";

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
    return(
        <div>
            <input type='text' onChange={onInputChange}/>
            <br></br>
            <br></br>
            <button onClick={onButtonSubmit}>
              Detect Image
            </button>
        </div>
    )
}

export default ImageLinkForm;