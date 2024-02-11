'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const NavBar = () => {
  const currentPath = usePathname()
  const links = [
    { label: 'My Habit Planner', href: '/' },
    { label: 'To Do', href: '/todo' },
  ]
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center font-medium">
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={`${
              link.href === currentPath ? 'text-gray-600' : 'text-gray-300'
            } hover:text-gray-800 transition-colors`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default NavBar
