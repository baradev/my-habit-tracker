"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { BsFlower1 } from "react-icons/bs";

const NavBar = () => {
  const currentPath = usePathname();
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "New Habit", href: "/newhabit" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center font-medium">
      <Link href="/">
        <BsFlower1 />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className={`${
              link.href === currentPath ? "text-zinc-900" : "text-zinc-500"
            } hover:text-zinc-800 transition-colors`}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
