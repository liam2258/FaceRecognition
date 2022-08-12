import '../App.css';
import React from 'react';
import {useState} from 'react';

function SignIn({onRouteChange, loadUser}) {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[errorOccurred, setError] = useState('')

    function onEmailChange(event) {
        setEmail(event.target.value);
    }

    function onPasswordChange(event) {
        setPassword(event.target.value);
    }

    function ErrorMessage() {
        if (errorOccurred) {
            return <p>{errorOccurred}</p>
        }
    }

    function onSubmitSignIn() {
        fetch('yourServerHere/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                loadUser(user);
                onRouteChange('home');
            } else {
                setError(user) 
            }
        })
    }

    return(
        <div className={'card'}>
            <h1>Sign In</h1>
            <p>Email</p>
            <input onChange={onEmailChange} type='text'/>
            <p>Password</p>
            <input onChange={onPasswordChange} type='text'/>
            <br></br>
            <br></br>
            <button style={{cursor: 'pointer'}} type="submit" onClick={() => onSubmitSignIn()}>Confirm</button>
            <br></br>
            <br></br>
            <button style={{cursor: 'pointer'}} onClick={() => onRouteChange('register')}>Register</button>
            <ErrorMessage />
        </div>
    );
}

export default SignIn;