import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import app from './Firebase';
import {toast} from 'react-toastify';


const Login = () => {
    const googleLogin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth(app);
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log(result);
                if(result.user) {
                    alert("Logged in successfully!");
                }
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }

    return (
        <div onClick={googleLogin} >Login with google</div>
    )
}

export default Login