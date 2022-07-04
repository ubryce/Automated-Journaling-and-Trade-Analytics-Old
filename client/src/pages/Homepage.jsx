import React from 'react'
import { GoogleLogin, googleLogout } from '@react-oauth/google';

const Homepage = () => {
  return (
    <div>
        <GoogleLogin
            onSuccess={credentialResponse => {
                console.log(credentialResponse);
            }}
            onError={() => {
                console.log('Login Failed');
            }}
            />
    </div>
  )
}

export default Homepage