'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useUserAuth } from '@/src/context/UserAuthContext'
import Navbar from "@/components/Navbar/page";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";

type LoginProps = {};

const Login: React.FC<LoginProps> = () => {

    const [inputs, setInputs] = useState({ email: "", password: "" });
    const router = useRouter();
    const {user, logIn, googleOAuth} = useUserAuth()

    useEffect(() => {
        if (user) {
            toast.success('Logged In successfully')
            router.push('/')
        }
    }, [user])
    

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) return alert("Please fill all fields");
        logIn(inputs.email, inputs.password)
    };


    return (
        <div className='bg-gradient-to-b from-gray-600 to-black h-screen relative'>
            <div className='max-w-7xl mx-auto'>
                <Navbar />
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <div className="w-96 flex items-center flex-col bg-white rounded-sm shadow-md p-8">
                        <Image className="mb-10" src='/logo2.svg' height={70} width={100} alt="logo" />
                        <form onSubmit={handleLogin} className="space-y-4 w-full ">
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
                            <button
                                type="submit"
                                className="w-full py-2 text-white bg-gradient-to-r from-[#37474f] to-[#546e7a] font-semibold rounded-md transition-all hover:from-[#838b8f] hover:to-[#4e5d65]"
                            >
                                Sign In
                            </button>
                        </form>
                        <p className="text-[#546e7a] w-full flex items-center justify-between mt-5">
                            <a href="/auth/resetPassword" >
                                Forgot Password?
                            </a>
                            <a href="/auth/signup" >
                                Sign Up
                            </a>
                        </p>
                        <p className="text-[#bdbdbd] text-[14px] mt-4 mb-4 ">
                        or you can sign in with
                        </p>
                        <FcGoogle className="cursor-pointer" onClick={()=>googleOAuth()} size={40} />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Login;