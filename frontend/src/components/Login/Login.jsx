import React from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from './Firebase';
import { toast, Bounce } from 'react-toastify';
import axios from 'axios';
import moment from 'moment';
import 'react-toastify/dist/ReactToastify.css';
// Google icon URL (SVG)
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { useNavigate } from 'react-router-dom';
 

const Login = () => {
    
const navigate = useNavigate(); // Initialize navigation

const googleLogin = async () => {
    try {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        // Sign in with Google
        const result = await signInWithPopup(auth, provider);
        const userEmail = result.user.email;
        // console.log("Logged in user email:", userEmail);

        
        // Send email to backend for validation & student data
        const response = await axios.get(`http://localhost:5000/student/${userEmail}`);
        const student = response.data; // Backend returns student data
        
           // 🔹 Store login status and role in session storage
        sessionStorage.setItem("userEmail", userEmail);
        sessionStorage.setItem("loginStatus", "true");
        sessionStorage.setItem("role", "Student");
        

        toast.success("Logged in successfully!", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,         
        });

        // Check if student is registered
        if (student.registered === "no") {
            navigate("/register"); // Redirect to registration page
            window.location.reload();  // Force re-render
        } else {
            navigate("/companylistings"); // Redirect to main page (company listing)
        }

    } catch (error) {
        console.error(error);

        // Handle backend validation errors
        if (error.response) {
            const { status, data } = error.response;

            if (status === 403 || status === 400) {
                toast.error(data.message, { position: "bottom-center", autoClose: 5000, theme: "light", transition: Bounce });
            } else if (status === 404) {
                toast.error("Student not found.", { position: "bottom-center", autoClose: 5000, theme: "light", transition: Bounce });
            } else {
                toast.error("Something went wrong. Please try again.", { position: "bottom-center", autoClose: 5000, theme: "light", transition: Bounce });
            }
        } else {
            toast.error("Network error. Please check your connection.", { position: "bottom-center", autoClose: 5000, theme: "light", transition: Bounce });
        }
    }
};


//WorkingOnThis {currently}

const googleLoginCoordinator = async () => {
    try {

        // 🔹 Fetch all coordinators from the backend
        const coordinators = await axios.get("http://localhost:5000/coordinators")
            .then(res => res.data) // Extract data properly
            .catch(error => {
                console.error("Error fetching coordinators:", error);
                throw new Error("Failed to fetch coordinators");
            });

        // 🔹 Google Authentication
        const provider = new GoogleAuthProvider();
        const auth = getAuth();
        const result = await signInWithPopup(auth, provider);
        const userEmail = result.user.email;

        // 🔹 Check if the user is a Placement Coordinator
        const isCoordinator = coordinators.some(
            (coordinator) =>
                coordinator.email === userEmail &&
                coordinator.role === "Placement Coordinator"
        );

        if (!isCoordinator) {
            toast.error("Access Denied! You are not a Placement Coordinator.", {
                position: "bottom-center",
                autoClose: 3000,
                theme: "light",
                transition: Bounce,
            });
            return;
        }

        // 🔹 Store login status and role
        // 🔹 Store user email in session storage
        sessionStorage.setItem("userEmail", userEmail);
        sessionStorage.setItem("loginStatus", "true");
        sessionStorage.setItem("role", "PlacementCoordinator");

        // 🔹 Fetch coordinator details from backend
        const response = await axios.get(`http://localhost:5000/coordinators/${userEmail}`)
            .then(res => res.data) // Extract data
            .catch(error => {
                console.error("Error fetching coordinator details:", error);
                throw new Error("Failed to fetch coordinator details");
            });

        console.log("Coordinator Details:", response); // Optional: Log fetched coordinator details

        // 🔹 Show success toast
        toast.success("Logged in successfully!", {
            position: "bottom-center",
            autoClose: 3000,
            theme: "light",
            transition: Bounce,
        });

        // 🔹 Redirect to Coordinator Dashboard
        navigate("/coordinator-dashboard");

    } catch (error) {
        console.error("Login Error:", error);

        // 🔹 Handle backend validation errors
        if (error.response) {
            const { status, data } = error.response;

            if (status === 403 || status === 400) {
                toast.error(data.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce
                });
            } else if (status === 404) {
                toast.error("Coordinator not found.", {
                    position: "bottom-center",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce
                });
            } else {
                toast.error("Something went wrong. Please try again.", {
                    position: "bottom-center",
                    autoClose: 5000,
                    theme: "light",
                    transition: Bounce
                });
            }
        } else {
            toast.error("Network error. Please check your connection.", {
                position: "bottom-center",
                autoClose: 5000,
                theme: "light",
                transition: Bounce
            });
        }
    }
};

    return (
        // 
        <div className="flex justify-center min-h-[46rem] bg-[#fafafa] ">

            <div className="my-[5rem]">


        <Tabs defaultValue="student" className="w-[40rem] p-[1.5rem] py-[2rem] mobile:w-full mobile:border-none mobile:shadow-none mobile:bg-transparent bg-white rounded-[0.5rem] border bg-card text-card-foreground shadow-sm ">
            <TabsList className="grid w-full grid-cols-3 rounded-[0.5rem] border bg-card text-card-foreground shadow-sm">
                <TabsTrigger className='' value="student">Student</TabsTrigger>
                <TabsTrigger value="recruiter">Recruiter</TabsTrigger>
                <TabsTrigger value="coordinator">Coordinator</TabsTrigger>
            </TabsList>
            <TabsContent value="student" >
                <Card className='rounded-[0.5rem]' >
                <CardHeader>
                    <CardTitle>Student Login</CardTitle>
                    <CardDescription>
                    Login with your official Student ID.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                <button
                        onClick={googleLogin}
                        className="flex border bg-card text-card-foreground shadow-md gap-[0.7rem] font-sans items-center justify-center text-black p-3 rounded-full w-56 active:transform-scale-105 transition-colors"
                    >
                        <FcGoogle />
                        {/* <img src={googleIconUrl} alt="Google" className="w-6 h-6 mr-2" /> */}
                        Continue with Google
                    </button>
                </CardContent>
                <CardFooter>
                    <h4 className='text-[0.9rem]'>Having Troubles?<a className='font-semibold cursor-pointer' href='mailto:placements@cs.du.ac.in'>  Mail to Us</a></h4>
                </CardFooter>
                </Card>
            </TabsContent>
            <TabsContent value="recruiter">
                            <Tabs defaultValue="recruiter_login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 border bg-card text-card-foreground shadow-sm">
                        <TabsTrigger value="recruiter_login">Login</TabsTrigger>
                        <TabsTrigger value="recruiter_register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="recruiter_login">
                        <Card className='rounded-[0.5rem]'>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                            To login, you must register yourself once.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type='email' defaultValue="" />
                            </div>
                            <div className="space-y-1">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" type='password' />
                            </div>
                        </CardContent>
                            
                        <CardFooter>
                            <Button className='select-none font-instrument px-[1.25rem] py-[0.5rem] bg-[#72265F] hover:text-[#72265F] hover:border-[1px] hover:border-[#72265F] active:scale-95 transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all font-semibold text-white rounded-[0.5rem]'>Login</Button>
                        </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="recruiter_register">
                        <Card className='rounded-[0.5rem]'>
                        <CardHeader>
                            <CardTitle>Register</CardTitle>
                            <CardDescription>
                            Create an account to get started. 
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type='email' defaultValue="" />
                            </div>
                            <div className="space-y-1">
                            <Label htmlFor="companyname">Company Name</Label>
                            <Input id="companyname" defaultValue="" />
                            </div>
                            <div className="space-y-1">
                            <Label htmlFor="createpassword">Create new password</Label>
                            <Input id="createpassword" type="password" />
                            </div>
                            <div className="space-y-1">
                            <Label htmlFor="confirmpassword">Confirm new password</Label>
                            <Input id="confirmpassword" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                         <Button className='select-none font-instrument px-[1.25rem] py-[0.5rem] bg-[#72265F] hover:text-[#72265F] hover:border-[1px] hover:border-[#72265F] active:scale-95 transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all font-semibold text-white rounded-[0.5rem]'>Register</Button>
                        </CardFooter>
                        </Card>
                    </TabsContent>
                    </Tabs>
          </TabsContent>
          <TabsContent value="coordinator">
          <Card className='rounded-[0.5rem]'>
                <CardHeader>
                    <CardTitle>Placement Coordinator Login</CardTitle>
                    <CardDescription>
                    Login with your official Student ID.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                <button
                        onClick={googleLoginCoordinator}
                        className="flex border bg-card text-card-foreground shadow-md gap-[0.7rem] font-sans items-center justify-center text-black p-3 rounded-full w-56 active:transform-scale-105 transition-colors"
                    >
                        <FcGoogle />
                        {/* <img src={googleIconUrl} alt="Google" className="w-6 h-6 mr-2" /> */}
                        Continue with Google
                    </button>
                </CardContent>
                <CardFooter>
                    <h4 className='text-[0.9rem]'>Having Troubles?<a className='font-semibold cursor-pointer' href='mailto:placements@cs.du.ac.in'>  Mail to Us</a></h4>
                </CardFooter>
                </Card>
          </TabsContent>
      
    </Tabs>

    
            </div>
            {/* <div className="text-center p-8 bg-white rounded-lg shadow-md"> */}
                {/* <div className="mb-4"> */}
                    {/* <img src={googleIconUrl} alt="Google Logo" className="w-8 h-8 mx-auto mb-4" /> */}
                    {/* <h2 className="text-2xl font-semibold text-gray-800"></h2> */}
                {/* </div> */}
                {/* <div> */}
                    {/* <button */}
                        {/* onClick={googleLogin} */}
                        {/* className="flex items-center justify-center text-black p-3 rounded-full w-56 active:transform-scale-105 transition-colors" */}
                    {/* > */}
                        {/* <FcGoogle /> */}
                        {/* <img src={googleIconUrl} alt="Google" className="w-6 h-6 mr-2" /> */}
                        {/* Continue with Google */}
                    {/* </button> */}
                {/* </div> */}
            {/* </div> */}
        </div>
    );
};

export default Login;
