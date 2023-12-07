import Link from "next/link";
import React from "react";
import { BsFlower1 } from "react-icons/bs";

const NavBar = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "New Habit", href: "/newHabit" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <BsFlower1 />
      </Link>
      <ul className="flex space-x-6">
        {links.map((link) => (
          <Link
            key={link.href}
            className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
