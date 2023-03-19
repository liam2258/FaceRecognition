import React from 'react';
import {useState} from 'react';

function Register({onRouteChange, loadUser}) {
    const[newName, setNewName] = useState('')
    const[newEmail, setNewEmail] = useState('')
    const[newPassword, setNewPassword] = useState('')
    const[errorOccurred, setError] = useState('')

    function onNewName(event) {
        setNewName(event.target.value);
    }

    function onNewEmail(event) {
        setNewEmail(event.target.value);
    }

    function onNewPassword(event) {
        setNewPassword(event.target.value);
    }

    function onSubmitRegistration() {
        fetch('https://facerecognizer.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: newName,
                email: newEmail,
                password: newPassword
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

    function ErrorMessage() {
        if (errorOccurred) {
            return <p>{errorOccurred}</p>
        }
    }

    return(
        <div className={'card'}>
            <h1>Register</h1>
            <p>Name</p>
            <input onChange={onNewName} type='text'/>
            <p>Email</p>
            <input onChange={onNewEmail} type='text'/>
            <p>Password</p>
            <input onChange={onNewPassword} type='text'/>
            <br></br>
            <br></br>
            <button style={{cursor: 'pointer'}} type="submit" onClick={() => onSubmitRegistration()}>Confirm</button>
            <ErrorMessage />
        </div>
    );
}

export default Register;