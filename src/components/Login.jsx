
import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import firebaseAppConfig from "../util/firebase-config";
import { getAuth ,signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseAppConfig)

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState(null);
  const [loader,setLoader] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [formValue, setFormValue] = useState({
    email:'',
    password:''
 })

  const login = async(e)=> {
       try{
             e.preventDefault()
             await signInWithEmailAndPassword(auth,formValue.email,formValue.password)
             navigate('/')
       }
       catch(err)
       {
        setError("invalid credentials please try again")
       }
       finally{
        setLoader(false)
     }
  }

  const handleOnChange = (e)=>{
    const input = e.target;
    const name = input.name;
    const value = input.value;

    setFormValue({
         ...formValue,
         [name]:value
    })

    
}

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/login.mp4"
        autoPlay
        loop
        muted
      />

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="w-full max-w-md bg-gray-0 border bg-opacity-90 rounded-lg shadow-lg p-8 animate-slide-in">
          <h1 className="text-2xl font-bold text-orange-600 text-center mb-6">
            Login
          </h1>
          <form onSubmit={login}>
            {/* Email Field */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-lime-400"
              >
                Email
              </label>
              <input
                 onChange={handleOnChange}
                type="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4 relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-lime-400"
              >
                Password
              </label>
              <input
                 onChange={handleOnChange}
                type={showPassword ? "text" : "password"}
                name="password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your password"
              />
              <span
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`ri-eye${showPassword ? "-off" : ""}-line text-xl mt-6 text-red-500 cursor-pointer`}
                ></i>
              </span>
            </div>

            {/* Submit Button */}
            
            {
              loader ?
                      <h1 className="text-lg font-semibold text-white">Loading...</h1>
                    :
                    <button
                       type="submit"
                       className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
                        >
                          Login
                    </button>
                          

             }

          </form>

          {/* Sign-Up Link */}
          <div>
            <p className="text-center text-sm text-white mt-4">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
          {error && 
               <div 
                className=" flex justify-between items-center mt-2 bg-rose-700 p-3 rounded shadow text-white font-semibold">
                    <p>{error}</p>
                    <button onClick={()=>setError(null)}>
                        <i className="ri-close-line"></i>
                    </button>
                </div>
           }
        </div>
      </div>
    </div>
  );
};

export default Login;
