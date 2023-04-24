import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import logo from '../cnotes-logo.png';

export default function LoginSplashscreen({ setUser }) {
  function handleCallbackResponse(response) {
    console.log('Encoded JWT ID token: ' + response.credential);
    let userObject = jwt_decode(response.credential);
    setUser({
      email: userObject.email,
      firstname: userObject.given_name,
      lastname: userObject.family_name,
    });
    document.getElementById('signInDiv').hidden = true;
  }

  useEffect(() => {
    // /* global google */
    window.google.accounts.id.initialize({
      client_id:
        '448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com',
      callback: handleCallbackResponse,
    });

    // window.google.accounts.id.prompt();

    window.google.accounts.id.renderButton(
      document.getElementById('signInDiv'),
      {
        theme: 'outline',
        size: 'large',
      }
    );
  }, []);

  return (
    <>
      <div className='center-container'>
        <img className='logo-splashscreen' src={logo} />
        <h1 className='text-outside-boxes'>Welcome to CNotes</h1>
        <h2 className='text-outside-boxes'>
          Your go-to app for taking notes and creating to-dos during work calls.
        </h2>
        <div id='signInDiv'></div>
      </div>
    </>
  );
}
