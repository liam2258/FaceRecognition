import './App.css';
import Navigation from './Components/Navigation';
import ImageLinkForm from './Components/ImageLinkForm';
import {useState, useEffect} from 'react';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import SignIn from './Components/SignIn';
import Register from './Components/Register';

function App() {
  const[input, setInput] = useState('')
  const[URL, setURL] = useState('')
  const[box, setBox] = useState({})
  const[route, setRoute] = useState('signin')
  const[isSignedIn, setSignIn] = useState(false)
  const[user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  })

  function reset () {
    setInput('')
    setURL('')
    setBox({})
  }

  function loadUser(data) {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    })
  }


  function calculateFaceLocation(response) {
    const clarifaiFace = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height)
    console.log(clarifaiFace.left_col, clarifaiFace.top_row, clarifaiFace.right_col, clarifaiFace.bottom_row)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height
    }
  } 

  function displayFaceBox(newBox) {
    setBox(newBox);
  }

  function onInputChange(event) {
    setInput(event.target.value);
  }

  function onButtonSubmit() {
    setURL(input);
    fetch('https://facerecognizer.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
          input: input
      })
    })
    .then(response => response.json())
    .then(
      function(response) {
        if (response) {
          fetch('https://facerecognizer.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            setUser(prevState => ({
              ...prevState, entries: count
            }))
          })
        }
        
        displayFaceBox(
          calculateFaceLocation(response)
        )
      })
      .catch(
        function(err) {
        console.log(err);
        return 
      }
    )
  }

  function onRouteChange(route) {
    if (route === 'signout') {
      setSignIn(false)
      reset();
    } else if (route === 'home') {
      setSignIn(true)
    }
    setRoute(route)
  }

  useEffect(() => {
    fetch('https://facerecognizer.herokuapp.com/')
    .then(response => response.json())
    .then(console.log)
   }, [])

  return (
    <div style={{textAlign: 'center'}}>
      <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>
      <div style={{textAlign: 'center'}}>
        <img src={require('./images/face-detection2.png')} alt='Face-Detection' width={'180px'}></img>
      </div>
      <h1>FaceFinder 3000</h1>
      { route === 'home'
        ?
          <div style={{minHeight: '500px'}}>
            <div className='card'>
              <h1>Welcome to FaceFinder</h1>
              <p> Hello {user.name}, you currently have {user.entries} entries!</p>
              <ImageLinkForm
                onInputChange={onInputChange}
                onButtonSubmit={onButtonSubmit}
              />
            </div>
            <FaceRecognition box={box} URL={URL}/>
          </div>
        : (
            route === 'register'
            ? <div style={{minHeight: '500px'}}>
                <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
              </div>
            : <div style={{minHeight: '500px'}}>
                <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
              </div>
          )
      }
    </div>
  );
}

export default App;