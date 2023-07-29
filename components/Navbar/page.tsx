'use client'

import Image from "next/image";
import Link from "next/link";

type NavbarProps = {};

const Navbar: React.FC<NavbarProps> = () => {


	return (
		<div className='flex bg-white items-center justify-between sm:px-12 px-2 md:px-24'>
			<Link href='/' className='flex items-center justify-center h-10 '>
				<Image src='/logo.png' alt='LeetClone' height={100} width={200} />
			</Link>
			<div className='flex items-center'>

				<button
					className=' bg-white text-brand-orange px-2 py-1 sm:px-4 rounded-[4px] text-sm 
                hover:text-white  hover:bg-brand-orange border-brand-orange border-[1px] 
                transition duration-300 ease-in-out
                '
				>
					☆ Premium
				</button>
			</div>
		</div>
	);
};
export default Navbar;