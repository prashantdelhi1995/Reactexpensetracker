import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, UserPlus, CreditCard, User, Download, Link2 } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Title */}
        <Link to="/" className="text-white text-2xl font-bold flex items-center space-x-2">
          <span>Expense Tracker App</span>
        </Link>

        {/* Menu for larger screens */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/login" className="text-white flex items-center space-x-1 hover:text-gray-300">
            <LogIn size={20} />
            <span>Login</span>
          </Link>
          <Link to="/signup" className="text-white flex items-center space-x-1 hover:text-gray-300">
            <UserPlus size={20} />
            <span>Signup</span>
          </Link>
          <Link to="/expense" className="text-white flex items-center space-x-1 hover:text-gray-300">
            <CreditCard size={20} />
            <span>Expense</span>
          </Link>
          <Link to="/profile" className="text-white flex items-center space-x-1 hover:text-gray-300">
            <User size={20} />
            <span>Profile</span>
          </Link>
          <Link to="/download" className="text-white flex items-center space-x-1 hover:text-gray-300">
            <Download size={20} />
            <span>Download</span>
          </Link>
          <Link to="/dummy" className="text-white flex items-center space-x-1 hover:text-gray-300">
            <Link2 size={20} />
            <span>Dummy Link</span>
          </Link>

          {/* Rounded Profile Avatar */}
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white"
          />
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden flex flex-col bg-blue-700 text-white p-3 space-y-2">
          <Link to="/login" className="flex items-center space-x-1 hover:text-gray-300">
            <LogIn size={20} />
            <span>Login</span>
          </Link>
          <Link to="/signup" className="flex items-center space-x-1 hover:text-gray-300">
            <UserPlus size={20} />
            <span>Signup</span>
          </Link>
          <Link to="/expense" className="flex items-center space-x-1 hover:text-gray-300">
            <CreditCard size={20} />
            <span>Expense</span>
          </Link>
          <Link to="/profile" className="flex items-center space-x-1 hover:text-gray-300">
            <User size={20} />
            <span>Profile</span>
          </Link>
          <Link to="/download" className="flex items-center space-x-1 hover:text-gray-300">
            <Download size={20} />
            <span>Download</span>
          </Link>
          <Link to="/dummy" className="flex items-center space-x-1 hover:text-gray-300">
            <Link2 size={20} />
            <span>Dummy Link</span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
