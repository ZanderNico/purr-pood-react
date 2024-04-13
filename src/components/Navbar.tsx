import { useState } from "react";
import logo from "../assets/good-pet-food.svg";
import { FiEdit, FiShoppingCart, FiMenu } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CartMenu from "./cart-menu/CartMenu";
import UpdateProfileDialog from "./dialogs/UpdateProfileDialog";

function Navbar({ showCartButton = true }) {
  const [open, setOpen] = useState<boolean>(false);
  const [openCart, setOpenCart] = useState<boolean>(false);
  const [showUpdateProfile, setShowUpdateProfile] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();

    navigate("/");
  };

  const handleOpenCart = () => {
    setOpenCart(!openCart);
  };
  const handleMenuOpen = () => {
    setOpen(!open);
  };

  const toggleUpdateProfile = () => {
    setShowUpdateProfile(!showUpdateProfile);
  };

  return (
    <nav className="bg-white px-4 py-2 sticky top-0 w-full z-40">
      <div className="mx auto flex justify-between items-center">
        <div className="flex justify-start items-center mx auto ">
          <img className="max-h-14 max-w-14" src={logo} alt="Logo" />
          <h1 className="font-bold text-yellow-500 text-2xl sm:text-3xl md:text-3xl xl:text-4xl mx-2">
          <span className=" text-slate-500">PURR</span> POOD
          </h1>
        </div>

        <div className="hidden md:flex space-x-2">
        {showCartButton && (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-full"
              onClick={handleOpenCart}
            >
              <FiShoppingCart size={24} />
            </button>
          )}
          <button
            className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold px-2 py-1 rounded-full flex items-center"
            onClick={toggleUpdateProfile}
          >
            <FiEdit size={20} /> edit profile
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded-full"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="md:hidden flex gap-3">
        {showCartButton && (
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold p-2 rounded-full"
              onClick={handleOpenCart}
            >
              <FiShoppingCart size={24} />
            </button>
          )}
          <button
            className="text-black focus:outline-none"
            onClick={handleMenuOpen}
          >
            <FiMenu size={24} />
          </button>
          {open && (
            <div className="absolute top-16 right-4 bg-gray-400 p-4">
              <div className="flex flex-col gap-2">
                <button
                  className="bg-yellow-400 hover:bg-yellow-600 text-white font-bold px-2 py-1 rounded-full flex items-center"
                  onClick={toggleUpdateProfile}
                >
                  <FiEdit size={20} /> edit profile
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold px-2 py-1 rounded-full"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {openCart && (
          <>
            <CartMenu />
          </>
        )}

        {showUpdateProfile && (
          <UpdateProfileDialog handleDialogClose={toggleUpdateProfile} />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
