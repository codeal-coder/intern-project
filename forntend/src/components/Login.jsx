import React, { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
    

    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError]  = useState("")
    const {handleLogin} = useContext(AuthContext)

    const handlelogin = async(e) =>{
        e.preventDefault();

        
        
        try {
            let result = await handleLogin(email,password)
            console.log(result);
            
            
            setEmail("")
            setPassword("")
            alert("user login seccessfully")
            
        } catch (error) {
            console.log(error);
            let msg = (error.responce.data.message)
            setError(msg)
            
        }
        
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={handlelogin} className="space-y-5">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              onChange={(e)=> setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              onChange={(e)=> setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <p className="text-red-600">{error}</p>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-200"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don’t have an account?
          <Link to={'/register'}>
                <span className="text-blue-600">Register</span>
          </Link>
            
          
        </p>
      </div>
    </div>
  );
};

export default Login;
