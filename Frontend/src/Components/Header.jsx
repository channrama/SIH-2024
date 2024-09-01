import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import "../Components/header.css";

export default function Header() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  return (
    <header className="shadow-md sticky top-0 bg-green-100 border-b border-gray-300 z-50">
      <nav className="container mx-auto flex justify-between items-center py-3">
        {/* Logo and Website Name */}
        <Link to="/" className="flex items-center">
          <img
            src="public/images/logo.jpeg"
            alt="Logo"
            className="rounded-full w-12 h-12 object-cover"
          />
          <span className="text-2xl font-semibold text-green-700">
            AgriSite
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="flex space-x-6 text-sm font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/farmers"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              Farmers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contractors"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              Contractors
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/realtimeprice"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              Real-Time Price
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/nafed"
              className={({ isActive }) =>
                `block py-2 px-4 ${
                  isActive ? "text-green-700" : "text-gray-700"
                } hover:text-green-700`
              }
            >
              NAFED
            </NavLink>
            </li>
        </ul>

        {/* Profile Icon */}
        <Menu>
          <MenuButton as="button" className="cursor-pointer focus:outline-none">
            <img
              className="userimg w-8 h-8 rounded-full border-2 border-green-500 hover:border-green-700 transition duration-200 ease-in-out"
              src="./images/user.png"
              alt="Profile"
            />
          </MenuButton>
          <MenuList className="mt-2 w-44 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            {token && role ? (
              <>
                <MenuItem className="px-4 py-2 hover:bg-green-100 rounded-md transition duration-150 ease-in-out">
                  <Link
                    to="/profile"
                    className="block w-full text-sm text-gray-800 hover:text-green-700"
                  >
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem
                  className="px-4 py-2 hover:bg-green-100 rounded-md transition duration-150 ease-in-out"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("role");
                    window.location.href = "/";
                  }}
                >
                  <span className="block w-full text-sm text-gray-800 hover:text-green-700">
                    Logout
                  </span>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem className="px-4 py-2 hover:bg-green-100 rounded-md transition duration-150 ease-in-out">
                  <Link
                    to="/login"
                    className="block w-full text-sm text-gray-800 hover:text-green-700"
                  >
                    Login
                  </Link>
                </MenuItem>
                <MenuItem className="px-4 py-2 hover:bg-green-100 rounded-md transition duration-150 ease-in-out">
                  <Link
                    to="/create-account"
                    className="block w-full text-sm text-gray-800 hover:text-green-700"
                  >
                    Create Account
                  </Link>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </nav>
    </header>
  );
}
