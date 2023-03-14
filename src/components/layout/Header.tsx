import {AnimatePresence,motion } from "framer-motion"
import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaUser } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';
import { useUser } from '@auth0/nextjs-auth0/client'
import Button, { Variant } from "../Button";
const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const { user } = useUser()
  const [isMenu, setIsMenu] = useState(false);
  const [isMobileNav, setMobileNav] = useState(false);

  return (
    <header className='sticky top-0 z-50 bg-white shadow-lg px-8'>
      <AnimatePresence>
        <div className='layout flex h-16 items-center justify-between'>
          <div className="p-2 border border-gray-700 rounded md:hidden cursor-pointer" onClick={() => setMobileNav(!isMobileNav)}>
            {isMobileNav?<RxCross2 />:<FaBars  />}
          </div>
        <Link href='/' className='text-blue-600 font-semibold text-3xl hover:scale-105 cursor-pointer '>
          tutorMe
        </Link>
        
        <nav>
            {isMobileNav && <motion.div initial={{ opacity: 0, scale: 0.6, x: -50 }} animate={{ opacity: 1, scale: 1, x: 0 }} exit={{ opacity: 0, scale: 0.6, x: 0 }} className="absolute w-36 top-14 left-0 bg-white shadow-md text-gray-800 text-xs p-4">
              <ul className="gap-3">
              {links.map(({ href, label }) => (
              <li key={`${href}${label}`} className="p-3">
                <Link href={href} className='hover:text-gray-600 text-center '>
                  {label}
                </Link>
              </li>
            ))}</ul>
            </motion.div>}
            
          <ul className='md:flex items-center justify-between space-x-4 flex-row hidden md:visible'>
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link href={href} className='hover:text-gray-600'>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
          <div className="cursor-pointer relative" onClick={() => {
                  setIsMenu(!isMenu)
                }}>
                  <div className="flex gap-4 items-center justify-center">
            <FaUser className='text-2xl'/>
            <Link href={'/post'} ><Button variants={Variant.primary} >Post Offer</Button></Link></div>
            {isMenu &&
              (<motion.div initial={{ opacity: 0, scale: 0.6, y: 50 }} animate={{ opacity: 1, scale: 1, y:0 }} exit={{ opacity: 0, scale: 0.6, y:0 }} className="absolute w-36 top-11 right-0 bg-white shadow-md text-gray-800 text-xs ">
              <div className="flex flex-col">
                <p className="p-2">{user ? `Hello, ${user.name}` : 'Please login to continue'}</p>
                {user ?
                
                <Link href="/api/auth/logout" className='p-2 hover:text-orange-500' onClick={(e) => {
                  e.preventDefault()

                  }}>Sign Out</Link>
                   
           :<Link href="/api/auth/login" className='p-2 hover:text-orange-500' >Login</Link>}
                
              </div>
              </motion.div>)
            }
            
            
          </div>
        </div>

      </AnimatePresence>
    </header>
  );
}
