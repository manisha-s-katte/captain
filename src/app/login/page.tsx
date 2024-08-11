"use client";
import React, { useState } from "react";
import { FaGoogle, FaDiscord, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleEmailLogin = () => {
    setShowEmailLogin(prev => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#14021D] to-[#3C0056] p-4">
      <div className="rounded-[40px] border-1 border-[#D700E1] shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl sm:text-[42px] font-medium mb-6 text-center">
          Login
        </h1>
        <div className="space-y-6 p-0 sm:p-5">
          <button className="w-full py-2 text-xl font-semibold bg-white text-black rounded-xl flex items-center justify-center">
            Login with Google <FcGoogle className="ml-2 w-7 h-7" />
          </button>

          <div className="space-y-2">
            {/* Login with Discord */}
            <button className="w-full py-2 text-xl font-semibold bg-[#5865F2] text-white rounded-xl flex items-center justify-center">
              Login with Discord <FaDiscord className="ml-2 w-7 h-7" />
            </button>

            <p className="text-center text-xl">or</p>

            <button
              className="w-full py-2 text-xl font-semibold bg-[#350949] text-white rounded-xl flex items-center justify-center"
              onClick={toggleEmailLogin}
            >
              Login with Email
            </button>
          </div>

          {/* Email and Password Fields */}
          {showEmailLogin && (
            <div className="space-y-4 mt-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
                />
                <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          )}

          {/* Login Button */}
          <div className="flex justify-center">
            <button className="px-14 py-3 text-sm font-bold bg-[#D700E1] text-white rounded-3xl">
              <a href="/">Sign in</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
