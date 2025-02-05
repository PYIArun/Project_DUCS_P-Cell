import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from './Firebase';
import { toast } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';

// Google icon URL (SVG)
import { FcGoogle } from "react-icons/fc";


const Login = () => {
    const googleLogin = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            // Await the sign-in result
            const result = await signInWithPopup(auth, provider);

            // Await the axios request with email as URL parameter
            const response = await axios.get(`http://localhost:5000/student/${result.user.email}`);


            // For later checks on student session 
            // const sessionDate = moment(response.data.user.session).format('YYYY-MM');
            // const currentDate = moment().format('YYYY-MM');
            // if(response.data.length > 0 && currentDate >= sessionDate) {

            // }


            if (response.data.length === 0) {
                // If the response is an empty array, alert the user
                toast.error('You are not Validated', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            } else {
                console.log(response.data); // Handle the response here
                toast.success('Log in successful!', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="text-center p-8 bg-white rounded-lg shadow-md">
                <div className="mb-4">
                    {/* <img src={googleIconUrl} alt="Google Logo" className="w-8 h-8 mx-auto mb-4" /> */}
                    <h2 className="text-2xl font-semibold text-gray-800"></h2>
                </div>
                <div>
                    <button
                        onClick={googleLogin}
                        className="flex items-center justify-center text-black p-3 rounded-full w-56 active:transform-scale-105 transition-colors"
                    >
                        <FcGoogle />
                        {/* <img src={googleIconUrl} alt="Google" className="w-6 h-6 mr-2" /> */}
                        Continue with Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
