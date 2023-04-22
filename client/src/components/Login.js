import { GoogleLogin } from 'react-google-login';

const clientId =
  '448822010627-918u4m6fkd56s30l09soa3aq8up3lske.apps.googleusercontent.com';

export default function Login() {
  const onSuccess = (res) => {
    console.log('LOGIN SUCCESS! Current user:', res.profileObj);
  };

  const onFailure = (res) => {
    console.log('LOGIN FAILED! res:', res);
  };

  return (
    <div id='login-button'>
      <GoogleLogin
        clientId={clientId}
        buttonText='Login'
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
      />
    </div>
  );
}
