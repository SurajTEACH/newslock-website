
import React, { useState } from "react";
import {Link,useNavigate} from "react-router-dom";
import firebaseAppConfig from "../util/firebase-config";
import {getAuth,createUserWithEmailAndPassword,updateProfile} from "firebase/auth";

const auth = getAuth(firebaseAppConfig);
const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error,setError] = useState(null);
  const [loader,setLoader] = useState(false);

  const [formValue, setFormValue] = useState({
     fullname:'',
     email:'',
     password:''
  })

  const togglePasswordVisibility = () => {
     setShowPassword(!showPassword);
  };

  const signup = async(e)=>{
       try {
          e.preventDefault()
          setLoader(true)
          await createUserWithEmailAndPassword(auth, formValue.email,formValue.password)
          await updateProfile(auth.currentUser,{
            displayName:formValue.fullname
          })
          navigate('/')
       }
       catch(err)
       {
           setError(err.message)
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

      setError(null);
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
        {/* Background Video */}
        <video
           className="absolute top-0 left-0 w-full h-full object-cover"
           src="/videos/singup.mp4"
           autoPlay
           loop
           muted
        />

    
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40"></div>

        {/* singnup Form with Animation */}
        <div className="relative z-10 flex items-center justify-center h-full px-4">
              <div className="w-full max-w-md bg-gray-0  border bg-opacity-90 rounded-lg shadow-lg p-8 animate-slide-in">
                      <h1 className="text-2xl font-bold text-white text-center mb-6">
                      Signup
                      </h1>
                  <form onSubmit={signup}>
                      <div className="mb-4">
                          <label
                            htmlFor="fullname"
                            className="block text-sm font-medium text-lime-400"
                          >
                          Full Name
                          </label>
                          <input
                            onChange={handleOnChange}
                            type="text"
                            name="fullname"
                            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your full name"
                          />
                      </div>

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
                      {
                          loader ?
                          <h1 className="text-lg font-semibold text-white">Loading...</h1>
                          :
                          <button
                              type="submit"
                               className="w-full bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300 hover:bg-indigo-600"
                          >
                          Signup
                          </button>

                     }
                      
                  </form>
                  <div>
                     <p className="text-center text-sm text-white mt-4">
                        Already have an account?{" "}
                       <Link to="/login" className="text-orange-600 hover:underline">
                        Login
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

export default Signup;
