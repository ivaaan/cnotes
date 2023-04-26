// import { useEffect } from 'react';
// import jwt_decode from 'jwt-decode';
import logo from '../cnotes-logo-splashscreen.png';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';

export default function LoginSplashscreen({ setCurrentUser, setSignedIn }) {
  // function LoginButton() {
  //   const { isAuthenticated, loginWithRedirect } = useAuth0();

  //   return (
  //     !isAuthenticated && <button onClick={loginWithRedirect}>Log in</button>
  //   );
  // }

  // function handleCallbackResponse(response) {
  //   console.log('Encoded JWT ID token: ' + response.credential);
  //   let userObject = jwt_decode(response.credential);
  //   setSignedIn(true);
  //   setUser({
  //     // email: userObject.email,
  //     // firstname: userObject.given_name,
  //     // lastname: userObject.family_name,
  //     // Mock hard-coded user:
  //     email: 'diykarelia@gmail.com',
  //     firstname: 'Ivan',
  //     lastname: 'Zoloto',
  //   });
  //   // document.getElementById('signInDiv').hidden = true;
  // }

  // useEffect(() => {
  //   // /* global google */
  //   window.google.accounts.id.initialize({
  //     client_id:
  //       '448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com',
  //     callback: handleCallbackResponse,
  //   });

  //   // window.google.accounts.id.prompt();

  //   window.google.accounts.id.renderButton(
  //     document.getElementById('signInDiv'),
  //     {
  //       theme: 'outline',
  //       size: 'large',
  //     }
  //   );
  // }, []);

  return (
    <>
      <div className='center-container'>
        <img className='logo-splashscreen' src={logo} />
        <h1 className='splashscreen text-outside-boxes'>Welcome to CNotes</h1>
        <h2 className='text-outside-boxes'>
          Your go-to app for taking notes and creating to-dos during work calls.
        </h2>
        {/* <div id='signInDiv'></div> */}
        <LoginButton />
      </div>
    </>
  );
}
