import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className="flex gap-4 text-slate-700">
        <Link to='/'>
          <li className="hidden sm:inline hover:text-slate-400">Home</li>
        </Link>
        <Link to='/about'>
          <li className=" hover:text-slate-400 cursor-pointer">About</li>
        </Link>
        <Link to='/sign-in'>
          <li className=" hover:text-slate-400 cursor-pointer">Sign-in</li>
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
