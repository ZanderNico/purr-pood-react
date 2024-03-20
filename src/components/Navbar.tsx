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
          <h1 className="font-bold tracking-wider text-yellow-500 text-2xl sm:text-3xl md:text-3xl xl:text-4xl">
            Purr Pood
          </h1>
        </div>
        <div className="hidden md:flex space-x-5">
          <button>Edit Profile</button>
          <button>Cart</button>
          <NavLink className="text-black" to="/log-in">
            Logout
          </NavLink>
        </div>
        <div className="md:hidden flex gap-2">
          <button>Cart</button>
          <button
            className="text-black focus:outline-none"
            onClick={handleMenuOpen}
          >
            <FiMenu size={24} />
          </button>
          {open && (
            <div className="absolute top-16 right-4 bg-gray-700 p-4">
              <button>edit Profile</button>
              <NavLink className="block text-white" to="/sign-up">
                Logout
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
