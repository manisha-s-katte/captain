import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Settings = () => {
  return (
    <main className="flex h-screen bg-gradient-to-tr from-[#3A0153] to-[#1D022A] py-16">
      <Link href={"/"}>
      <div className='flex gap-2 text-white'><ChevronLeft></ChevronLeft> Back</div>
      </Link>
      <section className="flex-grow p-8 text-white flex justify-center items-center md:ml-64">
        <div className="border-2 border-[#D700E1] w-full md:w-96 p-6 rounded-xl flex flex-col justify-between max-w-md">
          <div className="mb-8 mt-5 flex flex-col items-center">
            <label htmlFor="username" className="block text-3xl text-center font-medium mb-2">
              Change Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="New Username"
              className="p-2 bg-transparent mt-1 border text-center border-[#D700E1] rounded-3xl text-white"
            />
          </div>

          {/* Change Password */}
          <div className="mb-8 flex flex-col items-center">
            <label htmlFor="password" className="block text-3xl font-medium mb-2">Change Password</label>
            <input
              id="password"
              type="password"
              placeholder="New Password"
              className="bg-transparent p-2 mt-1 text-center border border-[#D700E1] rounded-3xl text-white"
            />
          </div>

          {/* Purchases */}

        </div>
      </section>
    </main>
  );
}

export default Settings;
