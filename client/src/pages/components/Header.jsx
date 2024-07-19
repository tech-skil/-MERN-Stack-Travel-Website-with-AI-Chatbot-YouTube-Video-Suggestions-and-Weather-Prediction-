import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import defaultProfileImg from "../../assets/images/profile.png";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header
      style={{
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        backdropFilter: "blur(7px)",
      }}
      className="fixed top-0 left-0 right-0 z-50 px-3 py-2 md:p-4"
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-3xl md:text-5xl font-extrabold relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-orange-700">
              Triplo
            </span>
            <span className="absolute left-0.5 top-0.5 text-white opacity-15">
              Triplo
            </span>
          </h1>
        </Link>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto md:items-center mt-4 md:mt-0`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 space-y-16 md:space-y-0 text-white font-semibold mx-7">
            <li>
              <Link
                to="/"
                className={`${
                  location.pathname === "/"
                    ? "py-2 px-2 border-orange-600 rounded-md text-orange-700 border-b-2"
                    : "py-2 px-2 hover:border-orange-600 hover:rounded-md hover:text-orange-500 hover:border-b-2"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
            </li>
            <li>
              <Link
                to="/about"
                className={`${
                  location.pathname === "/about"
                    ? "py-2 px-2 border-orange-600 rounded-md text-orange-700 border-b-2"
                    : "py-2 px-2 hover:border-orange-600 hover:rounded-md hover:text-orange-500 hover:border-b-2"
                }`}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className={`${
                  location.pathname === "/contact"
                    ? "py-2 px-2 border-orange-600 rounded-md text-orange-700 border-b-2"
                    : "py-2 px-2 hover:border-orange-600 hover:rounded-md hover:text-orange-500 hover:border-b-2"
                }`}
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className={`${
                  location.pathname === "/privacy"
                    ? "py-2 px-2 border-orange-600 rounded-md text-orange-700 border-b-2"
                    : "py-2 px-2 hover:border-orange-600 hover:rounded-md hover:text-orange-500 hover:border-b-2"
                }`}
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
          <ul className="flex items-center space-x-4 md:space-x-8 mt-4 md:mt-0">
            {currentUser ? (
              <li>
                <Link
                  to={`/profile/${
                    currentUser.user_role === 1 ? "admin" : "user"
                  }`}
                >
                  <img
                    src={currentUser.avatar || defaultProfileImg}
                    alt={currentUser.username}
                    className="w-10 h-10 rounded-md border border-white shadow-md"
                  />
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" className="hover:from-yellow-500 hover:to-orange-700  ml-10 md:ml-0 py-4 rounded-md bg-gradient-to-r from-yellow-400 to-orange-600 px-2 font-bold text-xl text-white">
                  Sign/Signup
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
