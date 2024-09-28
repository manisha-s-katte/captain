'use client';
import React, { useState } from 'react';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';
import { PiUserListFill } from 'react-icons/pi';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '@/http/api';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Signup = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const { mutate: registerUserMutate, isPending: isRegisterUserMutatePending } =
    useMutation({
      mutationKey: ['registerUser'],
      mutationFn: async (data: any) => await registerUser(data),
      onSuccess: (data: any) => {
        toast.success(data.message);
        router.push('/login');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || error?.message);
      },
    });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted with data:', formData);
    registerUserMutate(formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#14021D] to-[#3C0056] p-4">
      <div className="rounded-[40px] border-1 border-[#D700E1] shadow-lg p-8 w-full max-w-lg">
        <h1 className="text-[32px] sm:text-[42px] font-medium mb-2 text-center sm:text-left text-white">
          Create new account
        </h1>
        <p className="text-base mb-6 text-center sm:text-left text-white">
          Already have an account?{' '}
          <a href="/login" className="text-[#D700E1] hover:underline">
            Login
          </a>
        </p>
        <form className="space-y-7 p-0 sm:p-3" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <div className="relative flex-1">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
                required
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <PiUserListFill className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
            </div>
            <div className="relative flex-1">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
                required
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <PiUserListFill className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
              required
              value={formData.email}
              onChange={handleInputChange}
            />
            <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
              required
              value={formData.password}
              onChange={handleInputChange}
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
            {/* <button className="w-full py-4 text-sm font-bold bg-[#350949] rounded-3xl text-white">
              Change Method
            </button> */}
            <button
              type="submit"
              className="w-full py-4 text-sm font-bold bg-[#D700E1] text-white rounded-3xl"
            >
              {isRegisterUserMutatePending ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2Icon
                    strokeWidth={4}
                    className="h-4 w-4 animate-spin"
                  />
                  <span>Creating...</span>
                </div>
              ) : (
                'Create Account'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
