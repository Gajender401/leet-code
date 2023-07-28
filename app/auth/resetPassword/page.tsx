'use client'

import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useUserAuth } from '@/src/context/UserAuthContext'
import Navbar from "@/components/Navbar/page";
import Image from "next/image";

type ResetPasswordProps = {};

const ResetPassword: React.FC<ResetPasswordProps> = () => {
    const [email, setEmail] = useState("");
    const { resetPassword } = useUserAuth()

    const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email !== "") {
            await resetPassword(email)
            toast.success('Reset link has been sent to your email.')
        }

    };


    return (
        <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <div className="w-96 flex items-center flex-col bg-white rounded-sm shadow-md p-8">
                        <Image className="mb-10" src='/logo2.svg' height={70} width={100} alt="logo" />
                        <form onSubmit={handleReset} className="space-y-4 w-full ">
                            <div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-blue-500"
                                    required
                                    placeholder="Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-gradient-to-r from-[#37474f] to-[#546e7a] font-semibold rounded-md transition-all hover:from-[#838b8f] hover:to-[#4e5d65]"
                            >
                                Reset
                            </button>
                        </form>
                        <p className="text-[#546e7a] w-full flex items-center justify-between mt-4">
                            <a href="/auth/login" >
                                Sign In
                            </a>
                            <a href="/auth/signup" >
                                Sign Up
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ResetPassword;