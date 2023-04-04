import Link from 'next/link';
import React from 'react'

const Footer = () => {
    const links = [
  { href: '/about', label: 'About' },
];
  return (
    
<footer className="p-4 bg-white border-t-2 b-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 ">
    <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="https://github.com/joc-rgb" className="hover:underline" target="_blank"
          rel="noopener noreferrer">Jocelin RGB</a>
    </span>
    <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0 gap-3">
        {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link href={href} className='hover:text-gray-600'>
                  {label}
                </Link>
              </li>
            ))}
    </ul>
</footer>

  )
}

export default Footer