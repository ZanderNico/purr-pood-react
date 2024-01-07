import { useState } from "react";
import logo from "../assets/good-pet-food.svg";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setOpen(!open);
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="mx auto flex justify-between items-center">
        <div className="flex justify-start items-center mx auto ">
          <img className="max-h-14 max-w-14" src={logo} alt="Logo" />
          <h1 className="font-bold tracking-wider text-yellow-500 text-5xl">
            FurrFood
          </h1>
        </div>
        <div className="hidden md:flex space-x-5">
          <a href="#" className="text-black">
            Show now
          </a>
          <a href="#" className="text-black">
            About
          </a>
          <NavLink className="text-black" to="/sign-up">
                Sign up
              </NavLink>
        </div>
        <div className="md:hidden">
          <button
            className="text-black focus:outline-none"
            onClick={handleMenuOpen}
          >
            <FiMenu size={24} />
          </button>
          {open && (
            <div className="absolute top-16 right-4 bg-gray-700 p-4">
              <a href="#" className="block text-white mb-2">
                Shop now
              </a>
              <a href="#" className="block text-white mb-2">
                About
              </a>
              <NavLink className="block text-white" to="/sign-up">
                Sign up
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
