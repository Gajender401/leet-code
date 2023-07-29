'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useUserAuth } from '@/src/context/UserAuthContext'
import Navbar from "@/components/Navbar/page";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {

    const [inputs, setInputs] = useState({ email: "", username: "", password: "" });
    const router = useRouter();

    const {user, signUp, googleOAuth } = useUserAuth()

    useEffect(() => {
        if (user) {
            toast.success('Signed up successfully')
            router.push('/')
        }
    }, [user])

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password || !inputs.username) return toast.error("Please fill all fields");
        else {
           await signUp(inputs.email, inputs.password, inputs.username)
           toast.success('Signed up successfully')
           router.push('/')
        }
    };




    return (
        <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <div className="w-96 flex items-center flex-col bg-white rounded-sm shadow-md p-8">
                        <Image className="mb-10" src='/logo2.svg' height={70} width={100} alt="logo" />
                        <form onSubmit={handleRegister} className="space-y-4 w-full ">
                            <div>
                                <input
                                    onChange={handleChangeInput}
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-blue-500"
                                    required
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <input
                                    onChange={handleChangeInput}
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-blue-500"
                                    required
                                    placeholder="Email"

                                />
                            </div>
                            <div>
                                <input
                                    onChange={handleChangeInput}
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-blue-500"
                                    required
                                    placeholder="Password"

                                />
                            </div>
                            <div>
                                <input
                                    onChange={handleChangeInput}
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className="w-full px-3 py-2 border rounded-sm focus:outline-none focus:border-blue-500"
                                    required
                                    placeholder="Confirm Password"

                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-gradient-to-r from-[#37474f] to-[#546e7a] font-semibold rounded-md transition-all hover:from-[#838b8f] hover:to-[#4e5d65]"
                            >
                                Sign Up
                            </button>
                        </form>
                        <p className="text-[#bdbdbd] text-center mt-4">
                            Have an account?{" "}
                            <a href="/auth/login" className="text-[#546e7a]">
                                Sign In
                            </a>
                        </p>
                        <FcGoogle className="cursor-pointer" onClick={()=>googleOAuth()} size={40} />

                    </div>
                </div>
            </div>
        </div>

    );
};
export default Signup;