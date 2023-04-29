import React from 'react';
import logo from '../cnotes-logo-splashscreen.png';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

export default function LoginSplashscreen({ setCurrentUser, setSignedIn }) {

  return (
    <>
      <div className='center-container'>
        <img className='logo-splashscreen' src={logo} alt="CNotes logo" />
        <h1 className='splashscreen text-outside-boxes'>Welcome to CNotes</h1>
        <h2 className='text-outside-boxes'>
          Your go-to app for taking notes and creating to-dos during work calls.
        </h2>
        {/* <div id='signInDiv'></div> */}
        <LoginButton data-testid="loginbuttontest"/>
      </div>
    </>
  );
}
