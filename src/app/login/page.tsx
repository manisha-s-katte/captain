'use client';
import React, { useState, FormEvent } from 'react';
import {
  FaGoogle,
  FaDiscord,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
} from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/http/api';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Loader2Icon } from 'lucide-react';
import { signIn } from 'next-auth/react';

const Login = () => {
  const router = useRouter();
  const [showEmailLogin, setShowEmailLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { mutate: loginUserMutate, isPending: isLoginUserMutatePending } =
    useMutation({
      mutationKey: ['loginUser'],
      mutationFn: async (data: any) => await loginUser(data),
      onSuccess: (data: any) => {
        toast.success(data.message);
        router.push('/');
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || error?.message);
      },
    });

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleEmailLogin = () => {
    setShowEmailLogin((prev) => !prev);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
    loginType: string
  ) => {
    event.preventDefault();
    switch (loginType) {
      case 'google':
        console.log('Logging in with Google');
        signIn('google', { redirectTo: '/' });
        break;
      case 'discord':
        console.log('Logging in with Discord');
        // Add Discord login logic here
        break;
      case 'email':
        console.log('Logging in with email', { email, password });
        loginUserMutate({ email, password });
        break;
      default:
        console.error('Unknown login type');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#14021D] to-[#3C0056] p-4">
      <div className="rounded-[40px] border-1 border-[#D700E1] shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl sm:text-[42px] font-medium mb-6 text-center">
          Login
        </h1>
        <form
          onSubmit={(e) => handleSubmit(e, showEmailLogin ? 'email' : 'social')}
          className="space-y-4 p-0 sm:p-5"
        >
          <button
            type="button"
            onClick={() => handleSubmit(new Event('submit') as any, 'google')}
            className="w-full py-2 text-xl font-semibold bg-white text-black rounded-xl flex items-center justify-center"
          >
            Login with Google <FcGoogle className="ml-2 w-7 h-7" />
          </button>

          <div className="space-y-4">
            <p className="text-center text-xl">or</p>
            <button
              type="button"
              className="w-full py-2 text-xl font-semibold bg-[#350949] text-white rounded-xl flex items-center justify-center"
              onClick={toggleEmailLogin}
            >
              Login with Email
            </button>
          </div>

          {showEmailLogin && (
            <div className="space-y-4 mt-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
                  required
                />
                <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400" />
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-5 bg-[#350949] rounded-lg focus:outline-none"
                  required
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

          <div className="flex flex-col gap-4 justify-center">
            <button
              type="submit"
              className="px-14 py-3 text-sm font-bold bg-[#D700E1] text-white rounded-3xl"
            >
              {isLoginUserMutatePending ? (
                <div className="flex items-center gap-2 justify-center">
                  <Loader2Icon
                    strokeWidth={4}
                    className="w-4 h-4 animate-spin"
                  />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign in'
              )}
            </button>
            <a href="/signup" className="text-sm text-center">
              Don&apos;t have an account?{' '}
              <span className="text-[#D700E1] hover:underline">Sign up</span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
