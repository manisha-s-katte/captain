"use client";
import React, { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { PiUserListFill } from "react-icons/pi";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#14021D] to-[#3C0056] p-4">
      <div className="rounded-[40px] border-1 border-[#D700E1] shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-[32px] sm:text-[42px] font-medium mb-2 text-center sm:text-left">
          Create new account
        </h1>
        <p className="text-base mb-6 text-center sm:text-left">
          Already have an account? <a href="/login" className="text-[#D700E1] hover:underline">Login</a>
        </p>
        <div className="space-y-7 p-0 sm:p-3">
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="First Name"
                className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
              />
              <PiUserListFill className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Last Name"
                className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
              />
              <PiUserListFill className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
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
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-8">
            <button className="w-full py-4 text-sm font-bold bg-[#350949] rounded-3xl text-white">
              Change Method
            </button>
            <button className="w-full py-4 text-sm font-bold bg-[#D700E1] text-white rounded-3xl">
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
