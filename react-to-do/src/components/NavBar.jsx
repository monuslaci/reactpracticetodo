import React from "react";
import { Link } from "react-router-dom";
import './NavBar.css'

export default function NavBar() {

      return (
        <nav className="flex items-center justify-between px-4 md:px-8 py-4 bg-white shadow">
          <div className='hidden md:flex gap-6'>
            <Link to='/'>Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to='/'>Services</Link>
            <Link to='/'>Contact</Link>
        </div>

        </nav>
      );
}